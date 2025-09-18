import { Rates } from "@/types/rates";
import { useEffect, useState } from "react";

type CacheEntry = {
  timestamp: number;
  data: Rates;
};

const CACHE_TTL = 1000 * 60 * 60 * 12; // 12 часов

function parseCbrXml(xmlText: string, currencyCode: string) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "text/xml");

  const dateAttr = xml.documentElement.getAttribute("Date") || "";

  const valute = Array.from(xml.getElementsByTagName("Valute")).find((v) => {
    return v.getElementsByTagName("CharCode")[0]?.textContent === currencyCode;
  });

  if (!valute) return null;

  const nominal = parseInt(
    valute.getElementsByTagName("Nominal")[0].textContent || "1"
  );
  const name = valute.getElementsByTagName("Name")[0].textContent || "";
  const valueText = valute.getElementsByTagName("Value")[0].textContent || "0";

  const value = parseFloat(valueText.replace(",", "."));

  return {
    date: dateAttr,
    nominal,
    currencyName: name,
    value,
  };
}

export function useExchangeRate(currencyCode: string = "MDL", nominal = 10) {
  const [data, setData] = useState<Rates>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cacheKey = `cbr_rate_${currencyCode}_${nominal}`;

  useEffect(() => {
    const format = (d: Date) =>
      d.toLocaleDateString("ru-RU").split(".").join("/");

    const isWeekday = (d: Date) => {
      const day = d.getDay();
      return day !== 0 && day !== 6;
    };

    const fetchRateWithFallback = async (startDate: Date, maxTries = 5) => {
      let attempt = 0;
      let date = new Date(startDate);

      while (attempt < maxTries) {
        if (!isWeekday(date)) {
          date.setDate(date.getDate() - 1);
          attempt++;
          continue;
        }

        const dateStr = format(date);

        try {
          const res = await fetch(`/api/currency?date_req=${dateStr}`);
          const buffer = await res.arrayBuffer();
          const decoded = new TextDecoder("windows-1251").decode(buffer);
          const parsed = parseCbrXml(decoded, currencyCode);
          if (parsed) return parsed;
        } catch {}

        date.setDate(date.getDate() - 1);
        attempt++;
      }

      return null;
    };

    const loadData = async () => {
      try {
        const cachedRaw = localStorage.getItem(cacheKey);
        if (cachedRaw) {
          const cached: CacheEntry = JSON.parse(cachedRaw);
          if (Date.now() - cached.timestamp < CACHE_TTL) {
            setData(cached.data);
            setIsLoading(false);
            return;
          }
        }

        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const dayBefore = new Date(yesterday);
        dayBefore.setDate(yesterday.getDate() - 1);

        const todayData = await fetchRateWithFallback(today);
        const yesterdayData = await fetchRateWithFallback(yesterday);
        const beforeYesterdayData = await fetchRateWithFallback(dayBefore);

        if (!todayData || !yesterdayData || !beforeYesterdayData) {
          throw new Error("Курс не найден");
        }

        const todayDiff = todayData.value - yesterdayData.value;
        const todayPercent = (todayDiff / yesterdayData.value) * 100;

        const yesterdayDiff = yesterdayData.value - beforeYesterdayData.value;
        const yesterdayPercent =
          (yesterdayDiff / beforeYesterdayData.value) * 100;

        const result: Rates = {
          code: currencyCode,
          nominal,
          currencyName: todayData.currencyName,
          date: todayData.date,
          prevDate: yesterdayData.date,
          rate: {
            value: todayData.value * (nominal / todayData.nominal),
            diff: todayDiff * (nominal / todayData.nominal),
            percent: todayPercent,
          },
          previous: {
            value: yesterdayData.value * (nominal / yesterdayData.nominal),
            diff: yesterdayDiff * (nominal / yesterdayData.nominal),
            percent: yesterdayPercent,
            prevDate: beforeYesterdayData.date,
            prevValue:
              beforeYesterdayData.value *
              (nominal / beforeYesterdayData.nominal),
          },
        };

        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            timestamp: Date.now(),
            data: result,
          })
        );

        setData(result);
      } catch (e) {
        console.error("Ошибка загрузки курса ЦБ РФ", e);
        setError("Ошибка загрузки курса ЦБ РФ");
      } finally {
        setIsLoading(false);
      }
    };

    loadData(); // первая загрузка
    const interval = setInterval(() => {
      loadData(); // обновление раз в час
    }, 1000 * 60 * 60);

    return () => {
      clearInterval(interval);
    };
  }, [currencyCode, nominal]);

  return { data, isLoading, error };
}
