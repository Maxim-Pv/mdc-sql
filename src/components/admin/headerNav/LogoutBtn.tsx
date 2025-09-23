'use client';

import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';

type Props = {
  className?: string;
  variant?: 'solid' | 'link';
};

export default function LogoutBtn({ className, variant = 'solid' }: Props) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [busy, setBusy] = useState(false);

  const match = pathname?.match(/^\/(ru|md)(?:\/|$)/);
  const locale = (match?.[1] as 'ru' | 'md') || 'ru';

  const isAdmin = (session as any)?.role === 'ADMIN';

  // пока грузится сессия — ничего не рисуем (без "мигания")
  if (status === 'loading') return null;
  if (!isAdmin) return null;

  const onClick = async () => {
    try {
      setBusy(true);
      // после выхода отправим на локализованную страницу логина админа
      await signOut({ redirect: true, callbackUrl: `/${locale}/admin` });
    } finally {
      setBusy(false);
    }
  };

  if (variant === 'link') {
    return (
      <button
        onClick={onClick}
        disabled={busy}
        className={clsx(
          'opacity-70 transition-opacity hover:opacity-100',
          className,
        )}
        title="Выйти из админ-панели"
      >
        {busy ? 'Exiting…' : 'Logout'}
      </button>
    );
  }

  // variant === 'solid'
  return (
    <button
      onClick={onClick}
      disabled={busy}
      className={clsx(
        'rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white shadow-sm backdrop-blur',
        'hover:bg-white/20 disabled:opacity-60',
        className,
      )}
      title="Выйти из админ-панели"
    >
      {busy ? 'Exiting…' : 'Logout'}
    </button>
  );
}
