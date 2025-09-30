import { prisma } from './prisma';

export const prismaAmount = prisma.$extends({
  result: {
    order: {
      amount: {
        needs: { amountCents: true },
        compute(o) {
          return Number((o.amountCents / 100).toFixed(2));
        }, // 2900.00
      },
    },
    orderItem: {
      unitPrice: {
        needs: { unitPriceCents: true },
        compute(o) {
          return Number((o.unitPriceCents / 100).toFixed(2));
        },
      },
      total: {
        needs: { totalCents: true },
        compute(o) {
          return Number((o.totalCents / 100).toFixed(2));
        },
      },
    },
  },
});

// переводим amountCents из базы в amount  o.amount -> 3290.00 (число), o.amountCents -> 329000 (как хранилось)
