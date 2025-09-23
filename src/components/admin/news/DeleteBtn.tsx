'use client';

import { IconTrashX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

type Props = {
  kind: 'news' | 'events';
  id: string;
  confirmText?: string;
  afterDeleteHref?: string; // опционально — куда уйти после удаления
  onDeleted?: () => void | Promise<void>; 
};

export default function DeleteButton({ kind, id, confirmText, afterDeleteHref, onDeleted }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = () => {
    if (!confirm(confirmText ?? 'Удалить запись?')) return;

    startTransition(async () => {
      const res = await fetch(`/api/${kind}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await onDeleted?.();
        if (afterDeleteHref) {
          router.push(afterDeleteHref);
        } else {
          router.refresh(); 
        }
      } else {
        const { error } = await res.json().catch(() => ({ error: 'Ошибка удаления' }));
        alert(error);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className="mt-2 inline-flex items-center justify-center rounded border px-3 py-1 text-red-600 hover:bg-red-50 disabled:opacity-30 cursor-pointer"
    >
      {pending ? 'Удаляю…' : 'Удалить'} <IconTrashX className="ml-2 h-4 w-4" />
    </button>
  );
}
