import { prisma } from '@/lib/admin/db';
import { adminOnly } from '@/lib/auth/adminOnly';
import crypto from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

function toSlug(s: string) {
  return s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase();
}
export async function GET() {
  const items = await prisma.event.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ items });
}

export const POST = adminOnly(async (req) => {
  const ct = req.headers.get('content-type') || '';

  if (ct.includes('multipart/form-data')) {
    const form = await req.formData();
    const title = String(form.get('title') ?? '').trim();
    const body = String(form.get('body') ?? '');
    const date = String(form.get('date') ?? '');
    const objectPosition = form.get('objectPosition') ? String(form.get('objectPosition')) : null;
    const cover = form.get('cover') as File | null;

    if (!title) return NextResponse.json({ error: 'title required' }, { status: 400 });

    const slugBase = toSlug(title);
    let slug = slugBase;
    let i = 1;
    while (await prisma.news.findUnique({ where: { slug } })) {
      slug = `${slugBase}-${i++}`;
    }

    let coverUrl: string | null = null;
    if (cover && cover.size > 0) {
      const allowed = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
      const ext = path.extname(cover.name || '').toLowerCase();
      if (!allowed.has(ext)) {
        return NextResponse.json({ error: 'Недопустимый тип файла' }, { status: 400 });
      }
      if (cover.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: 'Файл слишком большой (макс. 5MB)' }, { status: 413 });
      }

      const destDir = path.join(process.cwd(), 'public', 'images', 'news');
      await mkdir(destDir, { recursive: true });

      const salt = crypto.randomBytes(6).toString('hex');
      const fileName = `${slug}-${salt}${ext}`;
      const filePath = path.join(destDir, fileName);

      const buffer = Buffer.from(await cover.arrayBuffer());
      await writeFile(filePath, buffer);

      coverUrl = `/images/news/${fileName}`;
    }

    const created = await prisma.event.create({
      data: {
        slug,
        title,
        date,
        body,
        objectPosition,
        coverUrl,
        tags: [],
        published: true,
      },
      select: { id: true, slug: true, coverUrl: true },
    });

    return NextResponse.json(created, { status: 201 });
  }

  const payload = await req.json();
  if (!payload?.title) return NextResponse.json({ error: 'title required' }, { status: 400 });

  const slugBase = payload.slug?.trim() || toSlug(payload.title);
  let slug = slugBase;
  let i = 1;
  while (await prisma.event.findUnique({ where: { slug } })) {
    slug = `${slugBase}-${i++}`;
  }

  const created = await prisma.news.create({
    data: {
      slug,
      title: payload.title,
      date: payload.date ?? '',
      body: payload.body ?? '',
      coverUrl: payload.coverUrl ?? null,
      objectPosition: payload.objectPosition ?? null,
      tags: Array.isArray(payload.tags) ? payload.tags : [],
      published: payload.published ?? true,
    },
    select: { id: true, slug: true, coverUrl: true },
  });

  return NextResponse.json(created, { status: 201 });
});
