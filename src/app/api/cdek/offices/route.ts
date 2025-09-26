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
    const base = (process.env.CDEK_API_URL || '').replace(/\/+$/, '');
    if (!base) return json([], 200);

    const token = await ensureToken();

    const url = new URL(req.url);
    let code = url.searchParams.get('city_code');
    const name = url.searchParams.get('city');
    const size = url.searchParams.get('size') || '300';
    const is_handout = url.searchParams.get('is_handout') || 'true';
    const type = url.searchParams.get('type') || 'PVZ';

    if (!code && name) {
      const citiesRes = await fetch(`${base}/location/cities?city=${encodeURIComponent(name)}&size=1`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      const citiesData = await citiesRes.json();
      if (!citiesRes.ok) {
        console.error('CDEK /location/cities failed:', citiesRes.status, citiesData);
        return json([], 200);
      }
      code = Array.isArray(citiesData) && citiesData[0]?.code ? String(citiesData[0].code) : '';
      if (!code) return json([], 200);
    }

    const pointsParams = new URLSearchParams({
      city_code: code!,
      type,
      is_handout,
      size,
    });

    const pointsRes = await fetch(`${base}/deliverypoints?${pointsParams}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    const pointsData = await pointsRes.json();

    if (!pointsRes.ok) {
      console.error('CDEK /deliverypoints failed:', pointsRes.status, pointsData);
      return json([], 200);
    }

    return json(Array.isArray(pointsData) ? pointsData : [], 200);
  } catch (e: any) {
    console.error('offices failed:', e?.message || e);
    return json([], 200);
  }
}
