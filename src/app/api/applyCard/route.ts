import "server-only";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { readAttributionFromCookies } from "@/lib/utm";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    const h = await headers();
    const attr = await readAttributionFromCookies();

    const stats = {
      GCLID: attr.last.gclid ?? "",
      YCLID: attr.last.yclid ?? "",
      FBCLID: attr.last.fbclid ?? "",
      UTM_SOURCE: attr.last.utm_source ?? attr.first.utm_source ?? "",
      UTM_MEDIUM: attr.last.utm_medium ?? "",
      UTM_CAMPAIGN: attr.last.utm_campaign ?? "",
      UTM_CONTENT: attr.last.utm_content ?? "",
      UTM_TERM: attr.last.utm_term ?? "",
      REFERRER: attr.ref_last ?? attr.ref_first ?? "",
      LANDING_URL: attr.landing_last ?? attr.landing_first ?? "",
    };

    const payload = {
      api_key: process.env.API_TOKEN,
      ...body,
      // utm_source: stats.UTM_SOURCE,
      // utm_medium: stats.UTM_MEDIUM,
      // utm_campaign: stats.UTM_CAMPAIGN,
      // utm_content: stats.UTM_CONTENT,
      // utm_term: stats.UTM_TERM,
      stats,
      // тех.метки
      attribution_id: attr.attribution_id ?? "",
      touch_first_at: attr.touch_first_at ?? "",
      touch_last_at: attr.touch_last_at ?? "",
      ua: h.get("user-agent") ?? "",
      referer_hdr: h.get("referer") ?? "",
      ip: h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "",
    };

    const apiRes = await fetch(
      "https://clients.anykey.pro/mdcards/forms/save",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const raw = await apiRes.text();
    let data: any;
    try {
      data = raw ? JSON.parse(raw) : {};
    } catch {
      data = { ok: apiRes.ok, raw };
    }

    return NextResponse.json(data, { status: apiRes.status });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
