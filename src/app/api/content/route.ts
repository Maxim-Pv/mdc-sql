export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/admin/db';
import { ContentKind } from '@/types/news';

type Scope = 'upcoming' | 'past' | 'all';

function toItem(kind: ContentKind, r: any) {
  return {
    id: r.id,
    kind,
    title: r.title,
    date: r.date, // строка из БД
    image: r.coverUrl ?? undefined,
    objectPosition: r.objectPosition ?? undefined,
    published: r.published,
    body: r.body ?? undefined,
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const kind = (searchParams.get('kind') as ContentKind) || 'news';
  const scope = (searchParams.get('scope') as Scope) || 'all';
  const page = Math.max(1, Number(searchParams.get('page') || 1));
  const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit') || 10)));

  if (kind === 'events') {
    const now = new Date();
    const where: any = { published: true };
    if (scope === 'upcoming') where.publishedAt = { gte: now };
    if (scope === 'past') where.publishedAt = { lt: now };

    const [rows, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy: scope === 'upcoming' ? { publishedAt: 'asc' } : { publishedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.event.count({ where }),
    ]);
    return NextResponse.json(
      { items: rows.map((r) => toItem('events', r)), page, limit, total },
      { headers: { 'Cache-Control': 'private, no-store' } },
    );
  }

  const where: any = { published: true };
  const [rows, total] = await Promise.all([
    prisma.news.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.news.count({ where }),
  ]);
  return NextResponse.json(
    { items: rows.map((r) => toItem('news', r)), page, limit, total },
    { headers: { 'Cache-Control': 'private, no-store' } },
  );
}
