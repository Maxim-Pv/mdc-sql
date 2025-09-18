"use client";

import { useTranslations } from "next-intl";

export interface MusicCard {
  title: string;
  text: string;
  image: string;
}

export function useMusicCards(): MusicCard[] {
  const t = useTranslations("culture.music");
  const raw = t.raw("cards");
  const cardsArray: unknown[] = Array.isArray(raw) ? raw : [];

  return cardsArray.map((rawCard, idx) => {
    const card = rawCard as any;
    return {
      title: card?.title ?? "",
      text: card?.text ?? "",
      image: card?.image ?? "",
    };
  });
}
