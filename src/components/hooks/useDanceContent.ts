"use client";

import { useTranslations } from "next-intl";

export interface DanceContent {
  title: string;
  intro: string;
  lead: string;
  list: string[];
  conclusion: string;
}

export function useDanceContent(): DanceContent {
  const t = useTranslations("culture.dance");

  const title = t("title");
  const intro = t("intro");
  const lead = t("lead");
  const conclusion = t("conclusion");

  // Берём "list" через raw и защищённо приводим к string[]
  const rawList = (t as any).raw ? (t as any).raw("list") : undefined;
  const list: string[] = Array.isArray(rawList)
    ? rawList.filter((i) => typeof i === "string")
    : [];

  return {
    title,
    intro,
    lead,
    list,
    conclusion,
  };
}
