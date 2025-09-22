import 'server-only';
import { cookies } from 'next/headers';
import { verifyJwt } from '@/lib/admin/jwt';
import { prisma } from '@/lib/admin/db';

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;

  const payload = verifyJwt(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.uid },
    select: { id: true, email: true, role: true },
  });
  if (!user || user.role !== 'ADMIN') return null;
  return user;
}
