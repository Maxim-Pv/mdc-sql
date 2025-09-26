'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useCdekDelivery(initialCityCode: string, initialCityName: string) {
  const [cityCode, setCityCode] = useState(initialCityCode);
  const [cityName, setCityName] = useState(initialCityName);
  const [offices, setOffices] = useState<any[]>([]);
  const [pvzOptions, setPvzOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedPvzCode, setSelectedPvzCode] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null);
  const [days, setDays] = useState<string | null>(null);

  const ctrlRef = useRef<AbortController | null>(null);
  const reqIdRef = useRef(0);

  const samePvz = (a: any[], b: any[]) => {
    if (a === b) return true;
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    const ac = a.map((x: any) => String(x?.code)).join('|');
    const bc = b.map((x: any) => String(x?.code)).join('|');
    return ac === bc;
  };

  const loadOffices = useCallback(async (code: string, name: string) => {
    ctrlRef.current?.abort();
    const ctrl = new AbortController();
    ctrlRef.current = ctrl;

    const myReqId = ++reqIdRef.current;

    const qs = new URLSearchParams({
      type: 'PVZ',
      is_handout: 'true',
      size: '300',
    });

    if (code) qs.set('city_code', code);
    else if (name) qs.set('city', name);

    try {
      const res = await fetch(`/api/cdek/offices?${qs}`, { cache: 'no-store', signal: ctrl.signal });
      if (!res.ok) return;
      const list = await res.json();

      // console.log("useCdekDelivery.loadOffices got", list);

      if (reqIdRef.current !== myReqId) return; // устаревший ответ

      const arr: any[] = Array.isArray(list) ? list : [];

      setOffices((prev) => (samePvz(prev, arr) ? prev : arr));
      setPvzOptions(
        arr
          .filter((p: any) => !!p?.code)
          .map((p: any) => ({
            label: `${p?.location?.address_full || p?.address || p?.name} (${p?.code})`,
            value: String(p.code),
          })),
      );
    } catch (e: any) {
      if (e?.name === 'AbortError') return;
    }
  }, []);

  const quote = useCallback(async (toCityCode: number, totalWeightGrams = 250) => {
    try {
      const codeNum = Number(toCityCode ?? cityCode ?? 0);
      const body: any = {
        total_weight_g: totalWeightGrams,
      };
      if (codeNum > 0) body.to_city_code = codeNum;
      else body.to_city = cityName;

      const res = await fetch('/api/cdek/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok && data?.total_sum != null) {
        setPrice(data.total_sum);
        const pd = [data.period_min, data.period_max].filter(Boolean);
        setDays(pd.length ? pd.join('–') : null);
      } else {
        setPrice(null);
        setDays(null);
      }
    } catch {
      setPrice(null);
      setDays(null);
    }
  }, []);

  useEffect(() => {
    loadOffices(cityCode, cityName);

    setSelectedPvzCode('');
    setPrice(null);
    setDays(null);
    return () => {
      ctrlRef.current?.abort();
    };
  }, [cityCode, cityName, loadOffices]);

  return {
    cityCode,
    cityName,
    setCity: (code: string, name: string) => {
      setCityCode(code || '');
      setCityName(name || '');
    },
    offices,
    pvzOptions,
    selectedPvzCode,
    setSelectedPvzCode,
    price,
    days,
    quote,
  };
}
