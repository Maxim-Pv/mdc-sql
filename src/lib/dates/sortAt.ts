const RU_MONTHS: Record<string, number> = {
  января: 0,
  февраля: 1,
  марта: 2,
  апреля: 3,
  мая: 4,
  июня: 5,
  июля: 6,
  августа: 7,
  сентября: 8,
  октября: 9,
  ноября: 10,
  декабря: 11,
};

export function parseYYYYMMDD(s: string): Date | null {
  const m = s.match(/^(\d{4})\.(\d{2})\.(\d{2})$/);
  if (!m) return null;
  const [_, y, mo, d] = m;
  const dt = new Date(Number(y), Number(mo) - 1, Number(d), 12); // 12:00 во избежание DST краёв
  return isNaN(dt.getTime()) ? null : dt;
}

// "5 августа" -> Date(currentYear, 7, 5)
export function parseRuDayMonth(s: string, year = new Date().getFullYear()): Date | null {
  const m = s
    .trim()
    .toLowerCase()
    .match(/^(\d{1,2})\s+([а-яё]+)$/i);
  if (!m) return null;
  const day = Number(m[1]);
  const monthIdx = RU_MONTHS[m[2]];
  if (monthIdx == null) return null;
  const dt = new Date(year, monthIdx, day, 12);
  return isNaN(dt.getTime()) ? null : dt;
}

export function toYYYYMMDD(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
}

export function ruHumanToYYYYMMDD(s: string, year = new Date().getFullYear()): string {
  const d = parseRuDayMonth(s, year);
  return d ? toYYYYMMDD(d) : '';
}
