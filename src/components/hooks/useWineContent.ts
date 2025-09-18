"use client";

import { useTranslations } from "next-intl";

export interface Winery {
  name: string;
  text: string;
}
export interface WineTypeItem {
  name: string;
  text: string;
}
export interface WineContent {
  intro: string[];
  legendaryWineriesTitle: string;
  wineries: Winery[];
  mainVarietiesTitle: string;
  types: {
    white: {
      title: string;
      list: WineTypeItem[];
    };
    red: {
      title: string;
      list: WineTypeItem[];
    };
  };
}

export function useWineContent(): WineContent {
  const t = useTranslations("culture.wine");

  const rawIntro = (t as any).raw ? (t as any).raw("intro") : [];
  const intro: string[] = Array.isArray(rawIntro)
    ? rawIntro.filter((i: any) => typeof i === "string")
    : [];

  const legendaryWineriesTitle = t("legendaryWineriesTitle");
  const wineriesRaw = (t as any).raw ? (t as any).raw("wineries") : [];
  const wineries: Winery[] = Array.isArray(wineriesRaw)
    ? (wineriesRaw as any[]).map((w) => ({
        name: w.name ?? "",
        text: w.text ?? "",
      }))
    : [];

  const mainVarietiesTitle = t("mainVarietiesTitle");

  const whiteTitle = t("types.white.title");
  const redTitle = t("types.red.title");

  const whiteRaw = (t as any).raw ? (t as any).raw("types.white.list") : [];
  const redRaw = (t as any).raw ? (t as any).raw("types.red.list") : [];

  const whiteList: WineTypeItem[] = Array.isArray(whiteRaw)
    ? (whiteRaw as any[]).map((i) => ({
        name: i.name ?? "",
        text: i.text ?? "",
      }))
    : [];
  const redList: WineTypeItem[] = Array.isArray(redRaw)
    ? (redRaw as any[]).map((i) => ({
        name: i.name ?? "",
        text: i.text ?? "",
      }))
    : [];

  return {
    intro,
    legendaryWineriesTitle,
    wineries,
    mainVarietiesTitle,
    types: {
      white: {
        title: whiteTitle,
        list: whiteList,
      },
      red: {
        title: redTitle,
        list: redList,
      },
    },
  };
}
