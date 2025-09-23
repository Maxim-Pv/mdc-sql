import { PrismaClient } from '@prisma/client';
import { parseRuDayMonth } from '@/lib/dates/sortAt';

const prisma = new PrismaClient();

async function backfillNews() {
  const rows = await prisma.news.findMany({ where: { sortAt: null } });
  const year = new Date().getFullYear();
  for (const r of rows) {
    const parsed = parseRuDayMonth(r.date || '', year);
    if (parsed) {
      await prisma.news.update({ where: { id: r.id }, data: { sortAt: parsed } });
    }
  }
}

async function backfillEvents() {
  const rows = await prisma.event.findMany({ where: { sortAt: null } });
  const year = new Date().getFullYear();
  for (const r of rows) {
    const parsed = parseRuDayMonth(r.date || '', year);
    if (parsed) {
      await prisma.event.update({ where: { id: r.id }, data: { sortAt: parsed } });
    }
  }
}

(async () => {
  await backfillNews();
  await backfillEvents();
  await prisma.$disconnect();
})();
