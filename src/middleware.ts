import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const REDIRECT_MAIN = "https://mdcard.ru/ru/bots";
const REDIRECT_LKMD = "https://mdcard.ru/ru";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid", "yclid", "msclkid", "dclid", "clckid"];

const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 дней

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname.includes("/main")) {
    return NextResponse.redirect(REDIRECT_MAIN, 302);
  }
  if (url.pathname.includes("/lkmd") || url.pathname.includes("/merch")) {
    return NextResponse.redirect(REDIRECT_LKMD, 302);
  }

  const hasUtm = UTM_KEYS.some((k) => url.searchParams.has(k));
  const refererHdr = req.headers.get("referer") || "";

  // чистый landing без query
  const landingPath = `${url.origin}${url.pathname}`;

  // ——— ветка с очисткой URL: если есть UTM — делаем 302 и ставим куки на редирект-ответ
  if (hasUtm && req.method === "GET") {
    const clean = new URL(url.href);
    for (const k of UTM_KEYS) clean.searchParams.delete(k);
    if (![...clean.searchParams.keys()].length) clean.search = "";

    const res = NextResponse.redirect(clean, 302);
    stampAttributionCookies(res, req, { landingPath, refererHdr, url });

    return res;
  }

  const res = createMiddleware(routing)(req);
  stampAttributionCookies(res, req, { landingPath, refererHdr, url });

  return res;
}

function stampAttributionCookies(res: NextResponse, req: NextRequest, ctx: { landingPath: string; refererHdr: string; url: URL }) {
  const { landingPath, refererHdr, url } = ctx;
  const ck = req.cookies;

  // first/last landing
  if (!ck.get("landing_page_first")) {
    res.cookies.set("landing_page_first", landingPath, {
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
  }
  res.cookies.set("landing_page_last", landingPath, {
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  // referrer first/last
  if (refererHdr) {
    if (!ck.get("ref_first")) {
      res.cookies.set("ref_first", refererHdr, {
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      });
    }
    res.cookies.set("ref_last", refererHdr, {
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
  }

  // timestamps
  const nowIso = new Date().toISOString();
  if (!ck.get("touch_first_at")) {
    res.cookies.set("touch_first_at", nowIso, {
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
  }
  res.cookies.set("touch_last_at", nowIso, {
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  // attribution id
  if (!ck.get("attribution_id")) {
    const id = (globalThis as any).crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
    res.cookies.set("attribution_id", id, {
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
  }

  // utm first/last
  for (const key of UTM_KEYS) {
    const v = url.searchParams.get(key);
    if (!v) continue;

    if (!ck.get(`utm_first_${key}`)) {
      res.cookies.set(`utm_first_${key}`, v, {
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      });
    }
    res.cookies.set(`utm_last_${key}`, v, {
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
  }
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next/static|_next/image|_next/webpack-hmr|_vercel|favicon.ico|robots.txt|sitemap.xml|assets|images|fonts|icons|.*\\.(?:js|mjs|css|map|json|txt|xml|png|jpg|jpeg|gif|svg|webp|avif|ico|woff|woff2|ttf|otf)).*)",
  ],
};
