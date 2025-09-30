import { prisma } from '@/lib/db/prisma';
import { prismaAmount } from '@/lib/db/prisma-amount';
import { YooKassa } from '@/lib/yookassa';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const clientOrderId = req.nextUrl.searchParams.get('orderId');
  if (!clientOrderId) return NextResponse.json({ error: 'orderId required' }, { status: 400 });

  const order = await prismaAmount.order.findUnique({ where: { clientOrderId } });
  if (!order) {
    return NextResponse.json({ orderId: clientOrderId, status: 'UNKNOWN' }, { status: 200 });
  }

  let status = order.status;

  if (order.paymentId && status === 'PENDING') {
    try {
      const p = await YooKassa.getPayment(order.paymentId);
      if (p.status === 'succeeded') {
        status = 'SUCCEEDED';
        await prisma.order.update({ where: { id: order.id }, data: { status } });
      } else if (p.status === 'canceled') {
        status = 'CANCELED';
        await prisma.order.update({ where: { id: order.id }, data: { status } });
      }
    } catch {
      // игнорим сетевые/SDK-ошибки — просто вернём локальный статус
    }
  }

  return new NextResponse(JSON.stringify({ orderId: order.clientOrderId, status }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}
