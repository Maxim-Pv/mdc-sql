import * as jwt from 'jsonwebtoken';

const raw = process.env.JWT_SECRET;
if (!raw) throw new Error('JWT_SECRET is not set');

const JWT_SECRET: jwt.Secret = raw;

export type JwtPayload = { uid: string; role: 'ADMIN' | 'USER' };

export function signJwt(
  payload: JwtPayload,
  options: jwt.SignOptions = { expiresIn: '7d' }
): string {
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}
