// src/auth.ts
import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // JWT-сессии, без таблицы сессий
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Admin',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().trim();
        const password = credentials?.password?.toString() ?? '';
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        if (user.role !== 'ADMIN' || user.isActive === false) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? 'Admin',
          role: 'ADMIN',
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role ?? 'ADMIN';
      return token;
    },
    async session({ session, token }) {
      (session as any).role = token.role ?? 'ADMIN';
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
};
