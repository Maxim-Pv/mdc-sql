'use client';

import { useModal } from '@/context/ModalContext';
import { IconEdit } from '@tabler/icons-react';
import { useState } from 'react';

type Props = {
  id: string;
  kind: 'news' | 'events';
  onSaved?: () => void | Promise<void>;
};

export default function EditButton({ id, kind, onSaved }: Props) {
  const { openModal } = useModal();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${kind}/${id}`, { method: 'GET', cache: 'no-store' });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: 'Не удалось загрузить' }));
        alert(error);
        return;
      }
      const item = await res.json(); // ожидаем { id, kind, title, date, image, objectPosition, published, body, slug }

      openModal('eventNewsUpdate', {
        data: { mode: 'edit', item },
        onSaved,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="mt-2 inline-flex items-center justify-center rounded border px-3 py-1 text-blue-600 hover:bg-gray-50 disabled:opacity-30 cursor-pointer"
    >
      {loading ? 'Открываю…' : 'Редактировать'} <IconEdit className="ml-2 h-4 w-4" />
    </button>
  );
}
