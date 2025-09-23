import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import 'server-only';

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return session && (session as any).role === "ADMIN" ? session : null;
}
