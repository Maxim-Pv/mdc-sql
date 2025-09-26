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

  let res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: id,
      client_secret: secret,
    }).toString(),
    cache: 'no-store',
  });
  if (!res.ok) {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: id, client_secret: secret }),
      cache: 'no-store',
    });
  }
  const j = await res.json();
  if (!res.ok || !j?.access_token) throw new Error(`auth failed: ${res.status} ${JSON.stringify(j)}`);

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
    const q = url.searchParams.get('q') || url.searchParams.get('city') || '';
    const size = Number(url.searchParams.get('size') || 20);

    if (!q || q.length < 2) return json([]);

    const token = await ensureToken();
    const api = (process.env.CDEK_API_URL || '').replace(/\/+$/, '');
    const r = await fetch(`${api}/location/cities?city=${encodeURIComponent(q)}&size=${size}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    const data = await r.json();
    return json(Array.isArray(data) ? data : [], r.status);
  } catch (e: any) {
    return json({ error: e?.message ?? 'cities failed' }, 500);
  }
}
