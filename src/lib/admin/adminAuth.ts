import { NextRequest } from 'next/server';

export function assertAdmin(req: NextRequest) {
  const header = req.headers.get('x-admin-secret') ?? '';
  const secret = process.env.ADMIN_SECRET ?? '';
  if (!secret || header !== secret) {
    const e = new Error('Forbidden');
    (e as any).status = 403;
    throw e;
  }
}
