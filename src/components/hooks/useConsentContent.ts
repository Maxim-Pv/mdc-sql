"use client";

import { useTranslations } from "next-intl";

export interface ConsentContent {
  heading: string;
  fields: {
    name: string;
    nameHint: string;
    address: string;
    addressHint: string;
  };
  paragraphs: string[];
  footer: {
    dateLabel: string;
    signLabel: string;
  };
}

export function useConsentContent(): ConsentContent {
  const t = useTranslations("consent");

  // вытягиваем массив параграфов
  const rawParagraphs = (t as any).raw ? (t as any).raw("paragraphs") : [];
  const paragraphs: string[] = Array.isArray(rawParagraphs)
    ? rawParagraphs.filter((p: any) => typeof p === "string")
    : [];

  return {
    heading: t("heading"),
    fields: {
      name: t("fields.name"),
      nameHint: t("fields.nameHint"),
      address: t("fields.address"),
      addressHint: t("fields.addressHint"),
    },
    paragraphs,
    footer: {
      dateLabel: t("footer.dateLabel"),
      signLabel: t("footer.signLabel"),
    },
  };
}
