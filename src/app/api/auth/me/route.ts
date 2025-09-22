import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/admin/jwt';
import { prisma } from '@/lib/admin/db';

export async function GET() {
  const cookieStore = await cookies(); // ⬅️ await
  const token = cookieStore.get('token')?.value;

  if (!token) return NextResponse.json({ user: null });
  const payload = verifyJwt(token);
  if (!payload) return NextResponse.json({ user: null });

  const user = await prisma.user.findUnique({
    where: { id: payload.uid },
    select: { id: true, email: true, role: true },
  });

  return NextResponse.json({ user });
}
