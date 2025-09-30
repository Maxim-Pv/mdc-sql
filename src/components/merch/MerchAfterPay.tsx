'use client';

import { useCart } from '@/providers/CartContext';
import { useEffect, useState } from 'react';
import { Toast } from '../ui/toast/Toast';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function MerchAfterPay() {
  const { clearCart } = useCart();
  const [toast, setToast] = useState<null | { variant: 'success' | 'error'; title: string; description?: string }>(
    null,
  );

  useEffect(() => {
    const orderId = localStorage.getItem('LAST_ORDER_ID');
    const markNum = Number(localStorage.getItem('LAST_ORDER_MARK') || '0');
    if (!orderId) return;

    const recentlyStarted = markNum > 0 && Date.now() - markNum < 10 * 60 * 1000;
    if (!recentlyStarted) return;

    let stop = false;
    (async () => {
      // одно "короткое окно": до 6 попыток и ВСЕГДА очищаем флаг в конце
      try {
        for (let i = 0; i < 6 && !stop; i++) {
          const res = await fetch(`/api/yookassa/order-status?orderId=${encodeURIComponent(orderId)}`, {
            cache: 'no-store',
          });
          const data = await res.json();

          if (res.ok && data?.status) {
            if (data.status === 'SUCCEEDED') {
              clearCart();
              setToast({ variant: 'success', title: 'Оплата прошла успешно', description: 'Спасибо! Заказ оформлен.' });
              break;
            }
            if (data.status === 'CANCELED') {
              setToast({
                variant: 'error',
                title: 'Оплата не завершена',
                description: 'Вы можете попробовать ещё раз.',
              });
              break;
            }
          }
          await sleep(1500);
        }
      } finally {
        localStorage.removeItem('LAST_ORDER_ID');
        localStorage.removeItem('LAST_ORDER_MARK');
      }
    })();

    return () => {
      stop = true;
    };
  }, [clearCart]);

  if (!toast) return null;

  return (
    <Toast
      title={toast.title}
      description={toast.description}
      variant={toast.variant}
      onClose={() => setToast(null)}
      timeToClose={5000}
    />
  );
}
