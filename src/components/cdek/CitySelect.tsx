'use client';
import CustomSelect from '@/components/ui/inputs/customSelect/CustomSelect';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type CityOpt = { label: string; value: string; raw: any };

function useDebouncedCallback<T extends (...args: any[]) => void>(cb: T, delay = 700) {
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
    // минимальная длина
    if (!q || q.trim().length < 3) {
      setOpts([]);
      lastSentRef.current = '';
      ctrlRef.current?.abort();
      return;
    }
    // не слать одинаковый q подряд
    if (q === lastSentRef.current) return;
    lastSentRef.current = q;

    ctrlRef.current?.abort();
    ctrlRef.current = new AbortController();
    setLoading(true);
    try {
      const r = await fetch(`/api/cdek/cities?q=${encodeURIComponent(q)}`, {
        signal: ctrlRef.current.signal,
        cache: 'no-store',
      });
      const j = await r.json();
      const mapped: CityOpt[] = (Array.isArray(j) ? j : []).map((c: any) => ({
        label: [c.city, c.region].filter(Boolean).join(', '),
        value: String(c.code),
        raw: c,
      }));
      setOpts(mapped);
    } catch {
      // игнор отмен/ошибок сети
    } finally {
      setLoading(false);
    }
  }, []);

  // трейлинговый дебаунс 700 мс
  const debouncedFetch = useDebouncedCallback(fetchCities, 700);

  return (
    <CustomSelect
      name="region"
      value={value}
      onValueChange={(code) => {
        if (!code) return onChange('', '');
        const picked = opts.find((o) => o.value === code);
        if (picked) onChange(picked.value, picked.label);
      }}
      options={opts}
      placeholder={placeholder}
      selectClassName={className}
      loading={loading}
      readOnlyInput={false}
      onInputChange={debouncedFetch}
      noOptionsText="Начните вводить город"
      clearable
    />
  );
}
