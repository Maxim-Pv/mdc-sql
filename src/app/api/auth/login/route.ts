import { NextResponse } from 'next/server';
import { prisma } from '@/lib/admin/db';
import bcrypt from 'bcryptjs';
import { signJwt } from '@/lib/admin/jwt';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = signJwt({ uid: user.id, role: user.role }, { expiresIn: '7d' });
  const res = NextResponse.json({ ok: true });

  res.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 дней
  });

  return res;
}
