'use client';
import { useCallback, useEffect, useState } from 'react';

export function useCdekDelivery(initialCityCode = '44', initialCityName = 'Москва') {
  const [cityCode, setCityCode] = useState(initialCityCode);
  const [cityName, setCityName] = useState(initialCityName);
  const [offices, setOffices] = useState<any[]>([]);
  const [pvzOptions, setPvzOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedPvzCode, setSelectedPvzCode] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null);
  const [days, setDays] = useState<string | null>(null);

  const loadOffices = useCallback(async (code: string, name: string) => {
    const qs = new URLSearchParams({
      type: 'PVZ',
      is_handout: 'true',
      size: '300',
    });
    if (code) qs.set('city_code', code);
    else if (name) qs.set('city', name);
    const r = await fetch(`/api/cdek/offices?${qs}`, { cache: 'no-store' });
    const list = await r.json();
    const opts = Array.isArray(list)
      ? list
          .filter((p: any) => !!p?.code)
          .map((p: any) => ({
            label: `${p?.location?.address_full || p?.address || p?.name} (${p?.code})`,
            value: String(p.code),
          }))
      : [];
    setOffices(Array.isArray(list) ? list : []);
    setPvzOptions(opts);
  }, []);

  const quote = useCallback(async (toCityCode: number, totalWeightGrams = 250) => {
    try {
      const res = await fetch('/api/cdek/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to_city_code: toCityCode,
          total_weight_g: totalWeightGrams,
        }),
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
  }, [cityCode, cityName, loadOffices]);

  return {
    cityCode,
    cityName,
    setCity: (code: string, name: string) => {
      setCityCode(code);
      setCityName(name);
      setSelectedPvzCode('');
      setPrice(null);
      setDays(null);
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
