"use client";

import { useTranslations } from "next-intl";

export interface DiasporaContent {
  intro: string;
  sectionTitle: string;
  cards: string[];
  unesco: {
    title: string;
    description: string;
    material: { title: string; paragraph: string };
    intangible: { title: string; list: string[] };
  };
}

export function useDiasporaContent(): DiasporaContent {
  const t = useTranslations("culture.diaspora");

  const intro = t("intro");
  const sectionTitle = t("sectionTitle");

  const rawCards = (t as any).raw ? (t as any).raw("cards") : [];
  const cards: string[] = Array.isArray(rawCards)
    ? rawCards.filter((c: any) => typeof c === "string")
    : [];

  const unescoTitle = t("unesco.title");
  const unescoDescription = t("unesco.description");
  const materialTitle = t("unesco.material.title");
  const materialParagraph = t("unesco.material.paragraph");
  const intangibleTitle = t("unesco.intangible.title");

  const rawIntangibleList = (t as any).raw
    ? (t as any).raw("unesco.intangible.list")
    : [];
  const intangibleList: string[] = Array.isArray(rawIntangibleList)
    ? rawIntangibleList.filter((i: any) => typeof i === "string")
    : [];

  return {
    intro,
    sectionTitle,
    cards,
    unesco: {
      title: unescoTitle,
      description: unescoDescription,
      material: { title: materialTitle, paragraph: materialParagraph },
      intangible: { title: intangibleTitle, list: intangibleList },
    },
  };
}
