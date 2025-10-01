import raw from '@/data/merch.json';
import { MerchItem, merchListSchema } from './schemes/merchSchema';

/** Статическая загрузка: JSON попадает в бандл */
export function loadMerchStatic(): MerchItem[] {
  // бросит исключение, если структура некорректна
  return merchListSchema.parse(raw);
}

export function findMerchBySlug(slug: string): MerchItem | undefined {
  const list = loadMerchStatic();
  return list.find((p) => p.slug === slug);
}
