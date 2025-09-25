const ruMap: Record<string, string> = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'e',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'c',
  ч: 'ch',
  ш: 'sh',
  щ: 'sch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
};

const roReplacements: Record<string, string> = { ă: 'a', â: 'a', î: 'i', ș: 's', ş: 's', ț: 't', ţ: 't' };

export function toSlug(input: string, opts?: { fallbackPrefix?: string }): string {
  const fallbackPrefix = opts?.fallbackPrefix ?? 'n';

  let s = (input ?? '').toString().toLowerCase().trim();

  // снять диакритику для латиницы
  s = s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');

  // румынские диакритики → базовая латиница
  s = s.replace(/[ăâîșşţț]/g, (ch) => roReplacements[ch] ?? ch);

  // транслит русских букв
  s = s.replace(/[а-яё]/g, (ch) => ruMap[ch] ?? '');

  // всё, что не [a-z0-9], превращаем в дефисы
  s = s.replace(/[^a-z0-9]+/g, '-');

  // схлопнуть дефисы и обрезать по краям
  s = s.replace(/^-+|-+$/g, '').replace(/-+/g, '-');

  if (!s) {
    // гарантированный фолбэк, если заголовок полностью «не-латиница»/эмодзи и т.п.
    const stamp = Date.now().toString(36);
    s = `${fallbackPrefix}-${stamp}`;
  }

  if (s.length > 120) s = s.slice(0, 120).replace(/-+$/, '');
  return s;
}
