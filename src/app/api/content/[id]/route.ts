export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { ContentKind } from '@/types/event-news';

function toItem(kind: ContentKind, r: any) {
  return {
    id: r.id,
    kind,
    title: r.title,
    date: r.date,
    image: r.coverUrl ?? undefined,
    objectPosition: r.objectPosition ?? undefined,
    published: r.published,
    body: r.body ?? '',
  };
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // получать id через Promise
  const { id: raw } = await params;
  const id = decodeURIComponent(raw || '').trim();

  const { searchParams } = new URL(req.url);
  const kind = (searchParams.get('kind') as ContentKind) || 'news';

  if (kind === 'events') {
    const row = await prisma.event.findUnique({ where: { id: id } });
    if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(toItem('events', row), { headers: { 'Cache-Control': 'private, no-store' } });
  }

  const row = await prisma.news.findUnique({ where: { id: id } });
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(toItem('news', row), { headers: { 'Cache-Control': 'private, no-store' } });
}
