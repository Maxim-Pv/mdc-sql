import { NextResponse } from 'next/server';

let tokenCache: { accessToken: string; expiresAtMs: number } | null = null;

async function ensureToken() {
  // используем кеш, если не истёк
  if (tokenCache && tokenCache.expiresAtMs > Date.now() + 10_000) {
    return tokenCache.accessToken;
  }

  const clientId = (process.env.CDEK_CLIENT_ID ?? '').trim();
  const clientSecret = (process.env.CDEK_CLIENT_SECRET ?? '').trim();
  const apiBaseUrl = (process.env.CDEK_API_URL ?? '').replace(/\/+$/, '');
  if (!clientId || !clientSecret || !apiBaseUrl) {
    throw new Error('Missing CDEK env vars: CDEK_CLIENT_ID / CDEK_CLIENT_SECRET / CDEK_API_URL');
  }

  const tokenUrl = `${apiBaseUrl}/oauth/token?grant_type=client_credentials`;

  // пробуем x-www-form-urlencoded
  let tokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
    }).toString(),
    cache: 'no-store',
  });

  // fallback: JSON
  if (!tokenResponse.ok) {
    tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
      }),
      cache: 'no-store',
    });
  }

  type TokenBody = { access_token?: string; expires_in?: number };
  const tokenBody: TokenBody = await tokenResponse.json();

  if (!tokenResponse.ok || !tokenBody.access_token) {
    throw new Error(`auth failed: ${tokenResponse.status} ${JSON.stringify(tokenBody)}`);
  }

  tokenCache = {
    accessToken: tokenBody.access_token,
    expiresAtMs: Date.now() + (tokenBody.expires_in ?? 3600) * 1000,
  };

  return tokenCache.accessToken;
}

function json(data: any, status = 200) {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      to_city_code?: number | string;
      to_city?: string;
      total_weight_g?: number | string;
      tariff_code?: number | string;
    };

    let toCityCode = Number(body.to_city_code ?? 0);
    const toCityName = (body.to_city ?? '').trim();

    const accessToken = await ensureToken();

    if (!toCityCode && toCityName) {
      const base = (process.env.CDEK_API_URL ?? '').replace(/\/+$/, '');
      const r = await fetch(`${base}/location/cities?city=${encodeURIComponent(toCityName)}&size=1`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: 'no-store',
      });
      const arr = await r.json();
      toCityCode = Array.isArray(arr) && arr[0]?.code ? Number(arr[0].code) : 0;
    }

    if (!toCityCode) {
      return json({ error: 'to_city_code is required (pass to_city_code or to_city)' }, 400);
    }

    const fromCode = Number(process.env.CDEK_FROM_CITY_CODE ?? 0);
    const weight = Math.max(200, Number(body.total_weight_g ?? 200));

    const tariffPayload = {
      tariff_code: Number(body.tariff_code ?? 136), // 136 — до ПВЗ
      from_location: { code: fromCode },
      to_location: { code: toCityCode },
      packages: [{ weight, length: 25, width: 20, height: 3 }],
      currency: 1,
    };

    const calcUrl = `${(process.env.CDEK_API_URL ?? '').replace(/\/+$/, '')}/calculator/tariff`;
    const calcResponse = await fetch(calcUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tariffPayload),
    });

    const calcJson = await calcResponse.json();
    return json(calcJson, calcResponse.status);
  } catch (err: any) {
    return json({ error: err?.message ?? 'quote failed' }, 500);
  }
}

// (опционально) поддержка GET для быстрой отладки:
// /api/cdek/quote?to_city_code=44&total_weight_g=250
export async function GET(req: Request) {
  const url = new URL(req.url);
  const to_city_code = url.searchParams.get('to_city_code');
  const to_city = url.searchParams.get('to_city') || undefined;
  const total_weight_g = Number(url.searchParams.get('total_weight_g') ?? 200);
  const tariff_code = url.searchParams.get('tariff_code') || undefined;
  return POST(
    new Request(req.url, {
      method: 'POST',
      body: JSON.stringify({ to_city_code, to_city, total_weight_g, tariff_code }),
    }),
  );
}
