import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

let tokenCache: { token: string; exp: number } | null = null;

async function ensureToken() {
  if (tokenCache && tokenCache.exp > Date.now() + 10_000) return tokenCache.token;

  const id = (process.env.CDEK_CLIENT_ID || '').trim();
  const secret = (process.env.CDEK_CLIENT_SECRET || '').trim();
  const base = (process.env.CDEK_API_URL || '').replace(/\/+$/, '');
  if (!id || !secret || !base) throw new Error('CDEK env is missing');

  const url = `${base}/oauth/token?grant_type=client_credentials`;

  // 1) x-www-form-urlencoded
  let res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: id,
      client_secret: secret,
    }).toString(),
    cache: 'no-store',
  });

  // 2) fallback: JSON
  if (!res.ok) {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: id, client_secret: secret }),
      cache: 'no-store',
    });
  }

  const j = await res.json();
  if (!res.ok || !j?.access_token) {
    throw new Error(`auth failed: ${res.status} ${JSON.stringify(j)}`);
  }
  tokenCache = {
    token: j.access_token,
    exp: Date.now() + (j.expires_in ?? 3600) * 1000,
  };
  return tokenCache.token;
}

function json(data: any, status = 200) {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('city_code');
    const name = url.searchParams.get('city');
    if (!code && !name) return json([], 200);

    const token = await ensureToken();
    let cityCode = code;

    if (!cityCode && name) {
      const r = await fetch(
        `${process.env.CDEK_API_URL!.replace(/\/+$/, '')}/location/cities?city=${encodeURIComponent(name)}&size=1`,
        {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
        },
      );
      const arr = await r.json();
      cityCode = Array.isArray(arr) && arr[0]?.code ? String(arr[0].code) : '';
      if (!cityCode) return json([], 200);
    }

    const p = new URLSearchParams({
      city_code: cityCode!,
      type: 'PVZ',
      is_handout: 'true',
      size: '300',
    });

    const res = await fetch(`${process.env.CDEK_API_URL!.replace(/\/+$/, '')}/deliverypoints?${p}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    const data = await res.json();
    return json(data, res.status);
  } catch (e: any) {
    return json({ error: e?.message ?? 'offices failed' }, 500);
  }
}
