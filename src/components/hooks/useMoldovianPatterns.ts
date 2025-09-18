"use client";

import { useTranslations } from "next-intl";

export interface CostumeItem {
  label: string;
  image?: string;
  color?: string;
  alt: string;
  text: string;
}

export interface MoldavianPatternsContent {
  intro: string;
  carpet: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    list: string[];
  };
  costume: {
    title: string;
    description: string;
  };
  costumes: CostumeItem[];
}

export function useMoldavianPatterns(): MoldavianPatternsContent {
  const t = useTranslations("culture.moldavianPatterns");

  const intro = t("intro");

  const carpetTitle = t("carpet.title");
  const paragraph1 = t("carpet.paragraph1");
  const paragraph2 = t("carpet.paragraph2");
  const paragraph3 = t("carpet.paragraph3");

  const rawCarpetList = (t as any).raw
    ? (t as any).raw("carpet.list")
    : undefined;
  const carpetList: string[] = Array.isArray(rawCarpetList)
    ? rawCarpetList.filter((i: any) => typeof i === "string")
    : [];

  const costumeTitle = t("costume.title");
  const costumeDescription = t("costume.description");

  const rawCostumes = (t as any).raw ? (t as any).raw("costumes") : undefined;
  const costumes: CostumeItem[] = Array.isArray(rawCostumes)
    ? (rawCostumes as any[])
        .filter((c) => c && typeof c === "object")
        .map((c) => ({
          label: c.label ?? "",
          alt: c.alt ?? "",
          text: c.text ?? "",
          color: c.color,
          image: c.image, // <-- теперь берём image тоже
        }))
    : [];

  return {
    intro,
    carpet: {
      title: carpetTitle,
      paragraph1,
      paragraph2,
      paragraph3,
      list: carpetList,
    },
    costume: {
      title: costumeTitle,
      description: costumeDescription,
    },
    costumes,
  };
}
