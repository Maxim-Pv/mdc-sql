"use client";

import { getDay } from "date-fns";

const ALWAYS_OPEN = ["кострома", "екатеринбург", "мобильная группа"];

const SUNDAY_ONLY = ["сочи", "сургут"];

export function isOfficeClosedOn(
  officeName?: string | null,
  date?: Date | null
): boolean {
  if (!officeName || !date) return false;

  const day = getDay(date); // 0=ВС, 1=ПН, ... 6=СБ
  const name = officeName.toLowerCase();

  if (ALWAYS_OPEN.some((s) => name.includes(s))) {
    return false;
  }

  if (SUNDAY_ONLY.some((s) => name.includes(s))) {
    return day === 0;
  }

  return day === 0 || day === 1;
}
