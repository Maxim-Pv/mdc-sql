import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL!;
  const plain = process.env.ADMIN_PASSWORD!;
  const rounds = Math.min(Math.max(Number(process.env.BCRYPT_SALT_ROUNDS ?? 12), 10), 14);

  const hash = await bcrypt.hash(plain, rounds);

  await prisma.user.upsert({
    where: { email },
    create: { email, passwordHash: hash, role: Role.ADMIN, isActive: true, name: 'Admin' },
    update: {},
  });

  console.log('Admin ensured:', email);
}

main().finally(() => prisma.$disconnect());
