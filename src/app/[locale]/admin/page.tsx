'use client';

import { useState, useTransition } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
});

type FormValues = z.infer<typeof schema>;

export default function AuthPage() {
  const router = useRouter();
  const search = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: FormValues) => {
    setError(null);
    startTransition(async () => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        const next = search.get('next') || '/';
        router.replace(next);
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.error ?? 'Ошибка авторизации');
      }
    });
  };

  return (
    <div className="mx-auto mt-16 max-w-md rounded-2xl border p-6 shadow-sm">
      <h1 className="mb-4 text-2xl font-semibold">Вход для администратора</h1>

      {error && <p className="mb-3 rounded-md bg-red-50 p-2 text-sm text-red-700">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm">Email</label>
          <input
            {...register('email')}
            type="email"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring"
            placeholder="admin@site.local"
            autoComplete="username"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm">Пароль</label>
          <input
            {...register('password')}
            type="password"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring"
            placeholder="••••••••"
            autoComplete="current-password"
          />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
        </div>

        <button
          disabled={isPending}
          className="inline-flex w-full items-center justify-center rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60 cursor-pointer hover:bg-black/80"
        >
          {isPending ? 'Входим…' : 'Войти'}
        </button>
      </form>
    </div>
  );
}
