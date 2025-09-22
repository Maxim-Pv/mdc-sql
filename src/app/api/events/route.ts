import { NextResponse } from 'next/server';
import { prisma } from '@/lib/admin/db';
import { requireAdmin } from '@/lib/admin/auth.server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

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

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const ct = req.headers.get('content-type') || '';

  if (ct.includes('multipart/form-data')) {
    const form = await req.formData();

    const title = String(form.get('title') ?? '').trim();
    const body = String(form.get('body') ?? '');
    const date = String(form.get('date') ?? '');
    const objectPosition = form.get('objectPosition') ? String(form.get('objectPosition')) : null;
    const cover = form.get('cover') as File | null;

    if (!title) return NextResponse.json({ error: 'title required' }, { status: 400 });

    // slug и проверка уникальности
    const slugBase = toSlug(title);
    let slug = slugBase;
    let i = 1;
    // короткий цикл даже при коллизиях
    while (await prisma.news.findUnique({ where: { slug } })) {
      slug = `${slugBase}-${i++}`;
    }

    // обработка файла
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
        date, // TEXT
        body, // TEXT
        objectPosition, // nullable
        coverUrl, // nullable
        tags: [], // по умолчанию пустой массив
        published: true,
      },
      select: { id: true, slug: true, coverUrl: true },
    });

    return NextResponse.json(created, { status: 201 });
  }

  // Fallback: старый JSON-вариант тоже поддерживаем
  const body = (await req.json()) as {
    title: string;
    body?: string;
    date?: string;
    coverUrl?: string | null;
    objectPosition?: string | null;
    tags?: string[];
    published?: boolean;
    slug?: string;
  };

  if (!body.title) return NextResponse.json({ error: 'title required' }, { status: 400 });

  const slugBase = body.slug?.trim() || toSlug(body.title);
  let slug = slugBase;
  let i = 1;
  while (await prisma.event.findUnique({ where: { slug } })) {
    slug = `${slugBase}-${i++}`;
  }

  const created = await prisma.event.create({
    data: {
      slug,
      title: body.title,
      date: body.date ?? '',
      body: body.body ?? '',
      coverUrl: body.coverUrl ?? null,
      objectPosition: body.objectPosition ?? null,
      tags: Array.isArray(body.tags) ? body.tags : [],
      published: body.published ?? true,
    },
    select: { id: true, slug: true, coverUrl: true },
  });

  return NextResponse.json(created, { status: 201 });
}
