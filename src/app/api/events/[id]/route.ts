import { NextResponse } from 'next/server';
import { prisma } from '@/lib/admin/db';
import { requireAdmin } from '@/lib/admin/auth.server';
import { mkdir, writeFile, unlink } from 'fs/promises';
import path from 'path';
import { randomBytes } from 'node:crypto';

export const runtime = 'nodejs';
type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const item = await prisma.event.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({
    id: item.id,
    kind: 'events',
    title: item.title,
    date: item.date ?? '',
    image: item.coverUrl ?? undefined,
    objectPosition: item.objectPosition ?? undefined,
    published: item.published,
    body: item.body ?? '',
    slug: item.slug,
  });
}

export async function PATCH(req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const existing = await prisma.event.findUnique({ where: { id } });
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

    const cover = form.get('cover') as File | null;
    if (cover && cover.size > 0) {
      const ext = path.extname(cover.name || '').toLowerCase();
      const allowed = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
      if (!allowed.has(ext)) return NextResponse.json({ error: 'Недопустимый тип файла' }, { status: 400 });
      if (cover.size > 5 * 1024 * 1024)
        return NextResponse.json({ error: 'Файл слишком большой (макс. 5MB)' }, { status: 413 });

      const destDir = path.join(process.cwd(), 'public', 'images', 'events');
      await mkdir(destDir, { recursive: true });
      const salt = randomBytes(6).toString('hex');
      const base = existing.slug || 'event';
      const fileName = `${base}-${salt}${ext}`;
      await writeFile(path.join(destDir, fileName), Buffer.from(await cover.arrayBuffer()));
      newCoverPath = `/images/events/${fileName}`;
      data.coverUrl = newCoverPath;
    }
  } else {
    const j = await req.json().catch(() => ({}));
    if (j.title !== undefined) data.title = j.title;
    if (j.body !== undefined) data.body = j.body;
    if (j.date !== undefined) data.date = j.date;
    if (j.objectPosition !== undefined) data.objectPosition = j.objectPosition;
    if (j.coverUrl !== undefined) data.coverUrl = j.coverUrl;
  }

  const updated = await prisma.event.update({
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
    },
  });

  if (newCoverPath && existing.coverUrl?.startsWith('/images/events/')) {
    const oldFull = path.join(process.cwd(), 'public', existing.coverUrl);
    try {
      await unlink(oldFull);
    } catch {}
  }

  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const existing = await prisma.event.findUnique({ where: { id: id } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (existing.coverUrl?.startsWith('/images/news/')) {
    const full = path.join(process.cwd(), 'public', existing.coverUrl);
    // не падаем, если файла нет
    try {
      await unlink(full);
    } catch {}
  }

  await prisma.event.delete({ where: { id: id } });
  return NextResponse.json({ ok: true, id: id, slug: existing.slug });
}
