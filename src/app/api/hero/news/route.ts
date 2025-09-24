import { prisma } from '@/lib/admin/prisma';
import { adminOnly } from '@/lib/auth/adminOnly';
import { buildUploadFileName, buildUploadUrl, getUploadDir } from '@/lib/uploads';
import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = (searchParams.get('locale') || 'ru') as string;

  const doc = await prisma.newsHero.findUnique({ where: { locale } });
  const payload = doc ?? {
    locale,
    title: 'ближайшие мероприятия и акции',
    dateLabel: '6 сентября',
    text: 'Вокальная мастерская Ольги Варвус: Ищем юные таланты!',
    imageUrl: '/images/news/varvus.webp',
    linkUrl: null,
  };

  return NextResponse.json(payload, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
  });
}

export const PATCH = adminOnly(async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const locale = (url.searchParams.get('locale') || 'ru') as string;

  await prisma.newsHero.upsert({ where: { locale }, create: { locale }, update: {} });

  const ct = req.headers.get('content-type') || '';
  const data: Record<string, any> = {};
  let newImageUrl: string | null = null;

  if (ct.includes('multipart/form-data')) {
    const form = await req.formData();
    if (form.has('title')) data.title = String(form.get('title') ?? '');
    if (form.has('dateLabel')) data.dateLabel = String(form.get('dateLabel') ?? '');
    if (form.has('text')) data.text = String(form.get('text') ?? '');
    if (form.has('linkUrl')) data.linkUrl = String(form.get('linkUrl') ?? '');

    const file = form.get('image') as File | null;
    if (file && file.size > 0) {
      const allowed = new Set(['.jpg', '.jpeg', '.png', '.webp']);
      const ext = path.extname(file.name || '').toLowerCase();
      if (!allowed.has(ext)) return NextResponse.json({ error: 'bad file type' }, { status: 400 });
      if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: 'too big' }, { status: 413 });

      const dir = getUploadDir('hero');
      await mkdir(dir, { recursive: true });

      const salt = crypto.randomBytes(6).toString('hex');
      const name = buildUploadFileName(`news-${locale}`, salt, ext);
      await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
      newImageUrl = buildUploadUrl('hero', name);
      data.imageUrl = newImageUrl;
    }
  } else {
    const j = await req.json().catch(() => ({}));
    for (const k of ['title', 'dateLabel', 'text', 'linkUrl', 'imageUrl'] as const) {
      if (k in j) data[k] = j[k] ?? null;
    }
  }

  const saved = await prisma.newsHero.update({ where: { locale }, data });
  return NextResponse.json(saved);
});
