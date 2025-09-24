import { NextResponse } from 'next/server';
import path from 'node:path';
import { readFile, stat } from 'node:fs/promises';
import { getUploadRootDir } from '@/lib/uploads';

export const runtime = 'nodejs';

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

export async function GET(_req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await ctx.params;
  if (!Array.isArray(segments) || segments.length < 2) {
    return new NextResponse('Not found', { status: 404 });
  }

  // /upload/<kind>/<file>
  const rel = segments.join('/');
  const root = getUploadRootDir();

  // защита от traversal
  const abs = path.resolve(root, rel);
  if (!abs.startsWith(path.resolve(root))) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  try {
    const st = await stat(abs);
    if (!st.isFile()) return new NextResponse('Not found', { status: 404 });

    const ext = path.extname(abs).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    const file = await readFile(abs);

    return new NextResponse(new Uint8Array(file), {
      headers: {
        'Content-Type': type,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
