'use client';

import { useSession } from 'next-auth/react';

export function useIsAdmin() {
  const { data: session } = useSession();
  const role = (session as any)?.role;
  return role === 'ADMIN';
}
