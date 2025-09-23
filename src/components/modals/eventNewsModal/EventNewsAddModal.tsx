'use client';

import { useModal } from '@/providers/ModalContext';
import type { EventNewsUpdate, Form } from '@/types/event-news';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useTransition } from 'react';
import { useForm } from 'react-hook-form';

export type EventNewsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: EventNewsUpdate;
  onSaved?: () => void;
  cacheKey?: string;
};

export default function EventNewsAddModal({ isOpen, onClose, data, onSaved }: EventNewsModalProps) {
  const isEdit = data.mode === 'edit';
  const kind = isEdit ? data.item.kind : data.kind;

  const defaults: Form = isEdit
    ? {
        title: data.item.title,
        body: (data.item.body as string) ?? '',
        date: data.item.date ?? '',
        objectPosition: data.item.objectPosition ?? '',
      }
    : {
        title: data.initial?.title ?? '',
        body: data.initial?.body ?? '',
        date: data.initial?.date ?? '',
        objectPosition: data.initial?.objectPosition ?? '',
      };

  const { register, handleSubmit, reset } = useForm<Form>({ defaultValues: defaults });
  useEffect(() => {
    if (isOpen) reset(defaults);
  }, [isOpen, isEdit, data, reset]);

  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  if (!isOpen) return null;

  const onSubmit = handleSubmit(async (formData) => {
    const fd = new FormData();
    fd.append('title', formData.title);
    fd.append('body', formData.body ?? '');
    if (formData.date) fd.append('date', formData.date);
    if (formData.objectPosition) fd.append('objectPosition', formData.objectPosition);

    const file = fileRef.current?.files?.[0];
    if (file) fd.append('cover', file); // если файла нет — не трогаем cover

    const url = isEdit ? `/api/${kind}/${data.item.id}` : `/api/${kind}`;
    const method: 'POST' | 'PATCH' = isEdit ? 'PATCH' : 'POST';

    const res = await fetch(url, { method, body: fd });
    if (res.ok) {
      onSaved?.();
      startTransition(() => router.refresh());
      onClose();
    } else {
      const { error } = await res.json().catch(() => ({ error: 'Ошибка сохранения' }));
      alert(error);
    }
  });

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/50 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {isEdit
              ? kind === 'news'
                ? 'Редактировать новость'
                : 'Редактировать мероприятие'
              : kind === 'news'
                ? 'Добавить новость'
                : 'Добавить мероприятие'}
          </h2>
          <button onClick={onClose} className="rounded p-1 text-gray-500 hover:bg-gray-100" aria-label="Закрыть">
            ✕
          </button>
        </div>

        {/* превью текущей обложки в режиме редактирования (если есть) */}
        {isEdit && data.item.image && (
          <div className="mb-3">
            <img src={data.item.image} alt="" className="max-h-40 w-full rounded object-cover" />
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-3" encType="multipart/form-data">
          <input
            {...register('title', { required: true })}
            className="w-full rounded border px-3 py-2"
            placeholder="Заголовок"
          />
          <input {...register('date')} className="w-full rounded border px-3 py-2" placeholder="Дата (1 января)" />

          <input
            ref={fileRef}
            name="cover"
            type="file"
            accept="image/*"
            className="w-full cursor-pointer rounded border px-3 py-2 text-blue-800"
          />

          <input
            {...register('objectPosition')}
            className="w-full rounded border px-3 py-2"
            placeholder="object-position (опц.)"
          />
          <textarea {...register('body')} className="h-40 w-full rounded border px-3 py-2" placeholder="Текст" />

          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded border px-4 py-2 hover:bg-gray-50"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex cursor-pointer items-center justify-center rounded bg-black px-4 py-2 text-white hover:bg-black/80 disabled:opacity-60"
            >
              {pending ? 'Сохраняю…' : isEdit ? 'Сохранить изменения' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
