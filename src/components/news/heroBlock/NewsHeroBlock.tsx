import { useIsAdmin } from '@/lib/auth/useIsAdmin';
import { useNewsHero } from '@/lib/swr/useNewsHero';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import st from './styles.module.css';

export default function NewsHeroBlock() {
  const pathname = usePathname();
  const locale = (pathname?.match(/^\/(ru|md)(?:\/|$)/)?.[1] as 'ru' | 'md') || 'ru';
  const { hero, isLoading, error, mutate } = useNewsHero(locale);
  const isAdmin = useIsAdmin();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const title = hero?.title ?? 'ближайшие мероприятия и акции';
  const dateLabel = hero?.dateLabel ?? '6 сентября';
  const text = hero?.text ?? 'Вокальная мастерская Ольги Варвус: Ищем юные таланты!';
  const image = hero?.imageUrl ?? '/images/news/varvus.webp';

  return (
    <section className="w-full">
      <div className={st.heroContainer}>
        <div className="flex w-full flex-col items-center gap-20 lg:max-w-[850px] lg:flex-row lg:items-start lg:gap-0 xl:max-w-[1110px] xl:justify-between">
          <h1 className={st.heroTitle}>{isLoading ? '…' : title}</h1>
          <div className={`${st.card} relative`}>
            <img src={image} alt="мероприятие" className={st.cardImage} />
            <div className={st.cardOverlay}>
              <span className={st.cardDate}>{dateLabel}</span>
              <p className={st.cardText}>{text}</p>
            </div>
            {isAdmin && (
              <button
                onClick={() => setOpen(true)}
                className="text-blue absolute top-3 right-3 z-5 cursor-pointer rounded bg-white px-3 py-1 text-sm font-bold text-blue-800 hover:bg-gray-200"
              >
                Редактировать
              </button>
            )}
          </div>
        </div>
      </div>

      {isAdmin && open && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget as HTMLFormElement);
            const res = await fetch(`/api/hero/news?locale=${locale}`, { method: 'PATCH', body: fd });
            if (res.ok) {
              setOpen(false);
              mutate(); // обновить локально
              router.refresh(); // и на всякий случай серверные части страницы
            } else {
              alert('Ошибка сохранения');
            }
          }}
          className="fixed inset-0 z-[100] grid place-items-center bg-black/50"
        >
          <div className="w-full max-w-lg rounded bg-white p-4">
            <h3 className="mb-2 text-lg font-semibold">Настройки Главного баннера</h3>
            <input
              name="title"
              defaultValue={hero?.title ?? ''}
              placeholder="Заголовок"
              className="mb-2 w-full rounded border px-3 py-2"
            />
            <input
              name="dateLabel"
              defaultValue={hero?.dateLabel ?? ''}
              placeholder="Дата (6 сентября)"
              className="mb-2 w-full rounded border px-3 py-2"
            />
            <input
              name="text"
              defaultValue={hero?.text ?? ''}
              placeholder="Текст"
              className="mb-2 w-full rounded border px-3 py-2"
            />
            <input
              name="linkUrl"
              defaultValue={hero?.linkUrl ?? ''}
              placeholder="Ссылка (опц.)"
              className="mb-2 w-full rounded border px-3 py-2"
            />
            <input
              name="image"
              type="file"
              accept="image/*"
              className="mb-4 w-full cursor-pointer rounded border px-3 py-2 text-blue-800"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded border px-4 py-2 hover:bg-gray-50"
              >
                Отмена
              </button>
              <button className="inline-flex cursor-pointer items-center justify-center rounded bg-black px-4 py-2 text-white hover:bg-black/80 disabled:opacity-60">
                Сохранить
              </button>
            </div>
          </div>
        </form>
      )}
    </section>
  );
}
