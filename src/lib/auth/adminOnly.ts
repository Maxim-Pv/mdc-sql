import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export type RouteCtx = { params: Promise<Record<string, string>> };

// Перегрузка 1: без params
export function adminOnly(handler: (req: Request) => Promise<Response>): (req: Request) => Promise<Response>;

// Перегрузка 2: с params (динамические маршруты)
export function adminOnly(
  handler: (req: Request, ctx: RouteCtx) => Promise<Response>,
): (req: Request, ctx: RouteCtx) => Promise<Response>;

export function adminOnly(handler: any) {
  return async (req: Request, ctx?: RouteCtx) => {
    const session = await getServerSession(authOptions);
    if (!session || (session as any).role !== 'ADMIN') {
      return new Response('Unauthorized', { status: 401 });
    }

    if (req.method !== 'GET') {
      const allowed = process.env.NEXTAUTH_URL || process.env.AUTH_URL;
      const origin = req.headers.get('origin');
      if (origin && allowed && new URL(allowed).origin !== origin) {
        return new Response('Forbidden (bad origin)', { status: 403 });
      }
    }

    return ctx ? handler(req, ctx) : handler(req);
  };
}
