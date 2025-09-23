'use client';
import { mutate } from 'swr';

export function revalidateNews() {
  mutate((key: unknown) => typeof key === 'string' && key.startsWith('/api/news?'), undefined, { revalidate: true });
}

export function revalidateEvents() {
  mutate((key: unknown) => typeof key === 'string' && key.startsWith('/api/events?'), undefined, { revalidate: true });
}
