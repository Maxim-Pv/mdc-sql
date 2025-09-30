import { YooKassa } from '@/lib/yookassa';
import { BodySchema } from '@/lib/schemes/bodySchema';
import type { ICreatePayment } from '@a2seven/yoo-checkout';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
import { prisma } from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';

export const runtime = 'nodejs';

const toCents = (n: number) => Math.round(n * 100);
const centsToRubStr = (cents: number) => (cents / 100).toFixed(2);
export async function POST(req: NextRequest) {
  try {
    const body = BodySchema.parse(await req.json());
    const idempotenceKey = req.headers.get('Idempotence-Key') ?? uuid();
    const returnUrl = process.env.YOOKASSA_RETURN_URL!;

    const itemsSumCents = body.items.reduce((s, it) => s + toCents(it.price) * it.qty, 0);
    const bodyAmountCents = toCents(body.amount);
    if (itemsSumCents > bodyAmountCents) {
      return NextResponse.json({ error: 'Amount is less than items total' }, { status: 400 });
    }
    // создаём draft-заказ в БД
    let order = await prisma.order
      .create({
        data: {
          clientOrderId: body.orderId,
          status: 'PENDING',
          amountCents: bodyAmountCents,
          currency: 'RUB',
          customerName: body.customer.fullName,
          customerEmail: body.customer.email,
          customerPhone: body.customer.phone,
          deliveryMethod:
            body.delivery.method === 'cdek' ? 'CDEK' : body.delivery.method === 'post' ? 'POST' : 'PICKUP',
          city: body.delivery.city ?? null,
          address: body.delivery.address ?? null,
          pickupPoint: body.delivery.pickupPoint ?? null,
          items: {
            create: body.items.map((it) => ({
              productId: it.productId ?? null,
              title: it.title,
              unitPriceCents: toCents(it.price),
              qty: it.qty,
              totalCents: toCents(it.price * it.qty),
            })),
          },
        },
        include: { items: true },
      })
      .catch(async (e) => {
        // 2) Идемпотентность по clientOrderId: если уже есть — используем его
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
          const existing = await prisma.order.findUnique({ where: { clientOrderId: body.orderId } });
          if (existing) return existing as any;
        }
        throw e;
      });

    if (order.paymentId) {
      const p = await YooKassa.getPayment(order.paymentId);
      const url = (p as any)?.confirmation?.confirmation_url;
      return NextResponse.json(
        { paymentId: p.id, orderId: order.clientOrderId, confirmationUrl: url },
        { status: 200 },
      );
    }

    // 3) готовим payload YooKassa
    const payload: ICreatePayment = {
      amount: { value: centsToRubStr(order.amountCents), currency: 'RUB' },
      confirmation: { type: 'redirect', return_url: returnUrl },
      capture: true,
      description: body.description,
      metadata: {
        orderId: order.clientOrderId,
        dbOrderId: order.id,
        email: body.customer.email,
      },

      // Опционально: явный способ оплаты
      // payment_method_data: { type: 'bank_card' },

      /* ---------------- 54-ФЗ (РАСКОММЕНТИРОВАТЬ ПЕРЕД ПРОДОМ) ----------------
      receipt: {
        customer: {
          email: body.customer.email,
          phone: body.customer.phone,
          full_name: body.customer.fullName,
        },
        items: body.items.map((it) => ({
          description: it.title.slice(0, 128),
          quantity: it.qty, // допускается дробное
          amount: { value: it.price.toFixed(2), currency: 'RUB' },
          vat_code: it.vat_code ?? 1,          // 1=без НДС; 2=0%; 3=10%; 4=20%; 5=10/110; 6=20/120
          // payment_subject: 'commodity',     // товар
          // payment_mode: 'full_prepayment',  // полная предоплата
        })),
      },
      ----------------------------------------------------------------------- */
    };

    const payment = await YooKassa.createPayment(payload, idempotenceKey);

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: payment.id },
    });

    const url = (payment as any)?.confirmation?.confirmation_url;
    return NextResponse.json(
      { paymentId: payment.id, orderId: order.clientOrderId, confirmationUrl: url },
      { status: 200 },
    );
  } catch (e: any) {
    console.error('create error:', e);
    const msg = e?.issues?.map((i: any) => `${i.path?.join('.')}: ${i.message}`).join('; ') || e?.message;
    return NextResponse.json({ error: msg || 'Bad request' }, { status: 400 });
  }
}
