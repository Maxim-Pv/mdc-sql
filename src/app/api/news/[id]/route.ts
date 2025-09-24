import { prisma } from '@/lib/admin/db';
import { adminOnly, RouteCtx } from '@/lib/auth/adminOnly';
import { mkdir, unlink, writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { parseYYYYMMDD, parseRuDayMonth } from '@/lib/dates/sortAt';
import path from 'path';
import { buildUploadFileName, buildUploadUrl, getUploadDir } from '@/lib/uploads';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const item = await prisma.news.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({
    id: item.id,
    kind: 'news',
    title: item.title,
    date: item.date ?? '',
    image: item.coverUrl ?? undefined,
    objectPosition: item.objectPosition ?? undefined,
    published: item.published,
    body: item.body ?? '',
    slug: item.slug,
  });
}

export const PATCH = adminOnly(async (req: Request, ctx: RouteCtx): Promise<Response> => {
  const { id } = await ctx.params;

  const existing = await prisma.news.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const ct = req.headers.get('content-type') || '';
  let data: Record<string, any> = {};
  let newCoverPath: string | null = null;

  if (ct.includes('multipart/form-data')) {
    const form = await req.formData();
    const title = form.get('title');
    if (title) data.title = String(title);
    const body = form.get('body');
    if (body !== null) data.body = String(body);
    const date = form.get('date');
    if (date !== null) data.date = String(date);
    const objectPosition = form.get('objectPosition');
    if (objectPosition !== null) data.objectPosition = String(objectPosition);

    const sortDate = form.get('sortDate');
    if (sortDate !== null) {
      const s = String(sortDate).trim();
      if (s === '') {
        data.sortAt = null; // явный сброс
      } else {
        const parsed = parseYYYYMMDD(s);
        if (!parsed)
          return NextResponse.json({ error: 'Некорректный sortDate, ожидается YYYY.MM.DD' }, { status: 400 });
        data.sortAt = parsed;
      }
    } else if (date != null) {
      const parsed = parseRuDayMonth(String(date), new Date().getFullYear());
      if (parsed) data.sortAt = parsed;
    }

    const cover = form.get('cover') as File | null;
    if (cover && cover.size > 0) {
      const ext = path.extname(cover.name || '').toLowerCase();
      const allowed = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
      if (!allowed.has(ext)) return NextResponse.json({ error: 'Недопустимый тип файла' }, { status: 400 });
      if (cover.size > 5 * 1024 * 1024)
        return NextResponse.json({ error: 'Файл слишком большой (макс. 5MB)' }, { status: 413 });

      const destDir = getUploadDir('news');
      await mkdir(destDir, { recursive: true });
      const salt = randomBytes(6).toString('hex');
      const base = existing.slug || 'news';
      const fileName = buildUploadFileName(base, salt, ext);
      await writeFile(path.join(destDir, fileName), Buffer.from(await cover.arrayBuffer()));
      newCoverPath = buildUploadUrl('news', fileName);
      data.coverUrl = newCoverPath;
    }
  } else {
    // JSON fallback
    const j = await req.json().catch(() => ({}));
    if (j.title !== undefined) data.title = j.title;
    if (j.body !== undefined) data.body = j.body;
    if (j.date !== undefined) data.date = j.date;
    if (j.objectPosition !== undefined) data.objectPosition = j.objectPosition;
    if (j.coverUrl !== undefined) data.coverUrl = j.coverUrl; // ручной апдейт, если надо

    if (j.sortDate !== undefined) {
      const s = typeof j.sortDate === 'string' ? j.sortDate.trim() : '';
      if (s === '') {
        data.sortAt = null;
      } else {
        const parsed = parseYYYYMMDD(s);
        if (!parsed)
          return NextResponse.json({ error: 'Некорректный sortDate, ожидается YYYY.MM.DD' }, { status: 400 });
        data.sortAt = parsed;
      }
    } else if (j.date !== undefined) {
      const parsed = parseRuDayMonth(String(j.date), new Date().getFullYear());
      if (parsed) data.sortAt = parsed;
    }
  }

  const updated = await prisma.news.update({
    where: { id },
    data,
    select: {
      id: true,
      slug: true,
      coverUrl: true,
      title: true,
      date: true,
      body: true,
      objectPosition: true,
      published: true,
      sortAt: true,
    },
  });

  // если заменили файл — можно удалить старый (только если он в нашей папке)
  if (newCoverPath && existing.coverUrl?.startsWith('/images/news/')) {
    const oldFull = path.join(process.cwd(), 'public', existing.coverUrl);
    try {
      await unlink(oldFull);
    } catch {}
  }

  return NextResponse.json(updated);
});

export const DELETE = adminOnly(async (req: Request, ctx: RouteCtx): Promise<Response> => {
  const { id } = await ctx.params;

  const existing = await prisma.news.findUnique({ where: { id: id } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (existing.coverUrl?.startsWith('/images/news/')) {
    const full = path.join(process.cwd(), 'public', existing.coverUrl);
    // не падаем, если файла нет
    try {
      await unlink(full);
    } catch {}
  }

  await prisma.news.delete({ where: { id: id } });
  return NextResponse.json({ ok: true, id: id, slug: existing.slug });
});
