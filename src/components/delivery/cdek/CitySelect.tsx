'use client';
import CustomSelect from '@/components/ui/inputs/customSelect/CustomSelect';
import { useCallback, useEffect, useRef, useState } from 'react';

type CityOpt = { label: string; value: string; cityData: any };

function useDebouncedCallback<T extends (...args: any[]) => void>(cb: T, delay = 300) {
  const cbRef = useRef(cb);
  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);
  const timerRef = useRef<number | null>(null);
  return useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => cbRef.current(...args), delay);
    },
    [delay],
  );
}

export default function CitySelect({
  value,
  onChange, // (code: string, name: string) => void
  placeholder = 'Ваш город',
  className,
}: {
  value: string;
  onChange: (code: string, name: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [opts, setOpts] = useState<CityOpt[]>([]);
  const [loading, setLoading] = useState(false);

  const ctrlRef = useRef<AbortController | null>(null);
  const lastSentRef = useRef<string>('');

  const fetchCities = useCallback(async (q: string) => {
    const query = q.trim();
    // минимальная длина
    if (query.length < 2) {
      setOpts([]);
      lastSentRef.current = '';
      ctrlRef.current?.abort();
      return;
    }
    // не слать одинаковый запрос подряд
    if (query === lastSentRef.current) return;
    lastSentRef.current = query;

    ctrlRef.current?.abort();
    ctrlRef.current = new AbortController();
    setLoading(true);
    try {
      const r = await fetch(`/api/cdek/cities?q=${encodeURIComponent(query)}&size=20`, {
        signal: ctrlRef.current.signal,
        cache: 'no-store',
      });
      const list = await r.json();
      // console.log("JSON первого запроса:", list);

      const cityData: CityOpt[] = Array.isArray(list)
        ? list.map((c: any) => ({
            label: [c.city, c.region].filter(Boolean).join(', '),
            value: String(c.code),
            cityData: c,
          }))
        : [];

      const qLower = query.toLowerCase();
      const filtered = cityData.filter((o) => o.label.toLowerCase().includes(qLower));
      // console.log("Отфильтрованные варианты:", filtered);

      setOpts(filtered);
    } catch {
      // игнор отмен/ошибок сети
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedFetch = useDebouncedCallback(fetchCities, 300);

  return (
    <CustomSelect
      name="region"
      value={value}
      onValueChange={(code) => {
        if (!code) return onChange('', '');
        const picked = opts.find((o) => o.value === code);
        if (picked) onChange(picked.value, picked.cityData.city);
      }}
      options={opts}
      placeholder={placeholder}
      selectClassName={className}
      loading={loading}
      onInputChange={debouncedFetch}
      noOptionsText="Начните вводить город"
      clearable
    />
  );
}
