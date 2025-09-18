"use client";

import { useTranslations } from "next-intl";

export interface Dish {
  title: string;
  description: string;
  image: string;
}

export interface CuisineContent {
  intro: string;
  dishes: Dish[];
}

export function useCuisineContent(): CuisineContent {
  const t = useTranslations("culture.cuisine");

  const intro = t("intro");

  // Берём raw, чтобы получить массив объектов
  const rawDishes = (t as any).raw ? (t as any).raw("dishes") : undefined;
  const dishes: Dish[] = Array.isArray(rawDishes)
    ? (rawDishes as any[])
        .filter((d) => d && typeof d === "object")
        .map((d) => ({
          title: d.title ?? "",
          description: d.description ?? "",
          image: d.image ?? "",
        }))
    : [];

  return {
    intro,
    dishes,
  };
}
