export async function getCurrentUserClient() {
  const res = await fetch('/api/auth/me', { cache: 'no-store' });
  const data = await res.json().catch(() => ({ user: null }));
  return data.user as { id: string; email: string; role: 'ADMIN' | 'USER' } | null;
}
