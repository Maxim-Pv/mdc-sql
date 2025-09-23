import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

type ParamsMaybePromise = Record<string, string> | Promise<Record<string, string>>;
type AnyCtx = { params?: ParamsMaybePromise };

export function adminOnly<T extends AnyCtx>(handler: (req: Request, ctx: T & { session: any }) => Promise<Response>) {
  return async (req: Request, ctx: T) => {
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

    return handler(req, { ...ctx, session } as T & { session: any });
  };
}
