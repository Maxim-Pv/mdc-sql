import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

let tokenCache: { token: string; exp: number } | null = null;

async function fetchToken() {
  const url = `${process.env.CDEK_API_URL}/oauth/token?grant_type=client_credentials`;
  const id = (process.env.CDEK_CLIENT_ID || '').trim();
  const secret = (process.env.CDEK_CLIENT_SECRET || '').trim();

  if (!id || !secret) {
    throw new Error('CDEK_CLIENT_ID/CDEK_CLIENT_SECRET are missing');
  }

  // 1) form-urlencoded
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
    // 2) JSON fallback
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: id, client_secret: secret }),
      cache: 'no-store',
    });
  }

  const data = await res.json();
  if (!res.ok) throw new Error(`${res.status} ${JSON.stringify(data)}`);
  return {
    token: data.access_token as string,
    exp: Date.now() + (data.expires_in ?? 3600) * 1000,
  };
}

export async function GET() {
  try {
    if (tokenCache && tokenCache.exp > Date.now() + 10_000) {
      return NextResponse.json({ access_token: tokenCache.token });
    }
    tokenCache = await fetchToken();
    return NextResponse.json({ access_token: tokenCache.token });
  } catch (e: any) {
    return new NextResponse(JSON.stringify({ error: `auth failed: ${e?.message}` }), { status: 401 });
  }
}
