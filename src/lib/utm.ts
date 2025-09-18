import "server-only";
import { cookies } from "next/headers";

const KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
  "yclid",
  "msclkid",
  "dclid",
  "clckid",
] as const;

type K = (typeof KEYS)[number];

export async function readAttributionFromCookies() {
  const c = await cookies();

  const first: Record<K, string | undefined> = {} as any;
  const last: Record<K, string | undefined> = {} as any;

  const get = (name: string) => c.get(name)?.value;

  for (const k of KEYS) {
    first[k] = get(`utm_first_${k}`);
    last[k] = get(`utm_last_${k}`);
  }

  return {
    first,
    last,
    ref_first: get("ref_first"),
    ref_last: get("ref_last"),
    landing_first: get("landing_page_first"),
    landing_last: get("landing_page_last"),
    attribution_id: get("attribution_id"),
    touch_first_at: get("touch_first_at"),
    touch_last_at: get("touch_last_at"),
  };
}
