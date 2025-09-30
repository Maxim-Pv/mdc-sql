import { YooKassa } from '@/lib/yookassa';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/admin/prisma';

export const runtime = 'nodejs';
type Hook = {
  event: 'payment.succeeded' | 'payment.canceled' | string;
  object: { id: string; status: string };
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Hook;
    if (!body?.object?.id) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const payment = await YooKassa.getPayment(body.object.id);

    const newStatus =
      payment.status === 'succeeded' ? 'SUCCEEDED' : payment.status === 'canceled' ? 'CANCELED' : 'PENDING';

    if (newStatus !== 'PENDING') {
      await prisma.order.update({
        where: { paymentId: payment.id },
        data: { status: newStatus },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'webhook error' }, { status: 500 });
  }
}
