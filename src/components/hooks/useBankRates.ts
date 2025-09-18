import { BankInfo, BankOffice } from "@/types/banks";
import { useState, useEffect } from "react";

const BANKS = [
  { id: "122250", name: "ИС Банк" },
  { id: "14480", name: "Трансстройбанк" },
];

const API_BASE = "/api/bestRates";
const STORAGE_KEY = "bankRates";
const NOMINAL = 100;
const REFRESH_INTERVAL = 60_000;

// Убрал ошибки из консоли, так как они не важны
async function fetchOffices(bankId: string): Promise<BankOffice[]> {
  try {
    const res = await fetch(`${API_BASE}?bankId=${bankId}`, {
      cache: "no-store", // всегда свежие данные
    });
    if (!res.ok) {
      console.warn(`Не удалось загрузить банк ${bankId}:`, res.status);
      return [];
    }
    const data = await res.json();
    if (!Array.isArray(data)) {
      console.warn(`Некорректный ответ для банка ${bankId}:`, data);
      return [];
    }
    return data;
  } catch (e) {
    console.warn(`Ошибка при запросе банка ${bankId}:`, e);
    return [];
  }
}

//  Хук сначала пытается достать из localStorage, затем всегда фетчит обновлённые данные в фоне.

export function useBankRates() {
  const [rates, setRates] = useState<BankInfo[] | null>(null);

  // функция загрузки и обновления
  const loadRates = async () => {
    try {
      const results = await Promise.all(BANKS.map((b) => fetchOffices(b.id)));
      const computed: BankInfo[] = results.map((offices, i) => {
        if (offices.length === 0) {
          return { bankName: BANKS[i].name, buy: 0, sale: 0 };
        }
        const buys = offices.map((o) => o.buy);
        const sales = offices.map((o) => o.sale);
        return {
          bankName: BANKS[i].name,
          buy: Number((Math.max(...buys) / NOMINAL).toFixed(2)),
          sale: Number((Math.min(...sales) / NOMINAL).toFixed(2)),
        };
      });
      setRates(computed);

      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ts: Date.now(), data: computed })
        );
      } catch (e) {
        console.error("Ошибка сохранения в localStorage", e);
      }
    } catch (e) {
      console.error("Ошибка получения курсов банков", e);
    }
  };

  useEffect(() => {
    // загрузка из localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.data) {
          setRates(parsed.data);
        }
      }
    } catch (e) {
      console.error("Ошибка чтения из localStorage", e);
    }

    // первая загрузка
    loadRates();

    // периодический refresh
    const interval = setInterval(loadRates, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return rates;
}
