'use client';
import useSWR from 'swr';

const fetcher = (u: string) => fetch(u).then((r) => r.json());

export function useNewsHero(locale: 'ru' | 'md') {
  const key = `/api/hero/news?locale=${locale}`;
  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 3000,
  });
  return { hero: data, error, isLoading, mutate };
}
