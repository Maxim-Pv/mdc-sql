'use client';

import EventNewsCard from '@/components/ui/eventNewsCard/EventNewsCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { useModal } from '@/context/ModalContext';
import { ContentItem, ContentKind } from '@/types/event-news';
import { IconCopyPlusFilled } from '@tabler/icons-react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import useSWRInfinite from 'swr/infinite';
import st from './styles.module.css';

type PageResponse = {
  items: ContentItem[];
  total: number;
  page: number;
  limit: number;
};

const fetcher = (url: string) =>
  fetch(url, { cache: 'no-store' }).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  });

function buildUrl(kind: ContentKind, page: number, limit: number, scope?: 'upcoming' | 'past' | 'all') {
  const p = new URLSearchParams({
    kind,
    page: String(page),
    limit: String(limit),
  });
  if (kind === 'events' && scope && scope !== 'all') p.set('scope', scope);
  return `/api/content?${p.toString()}`;
}

export default function ContentFeed({
  kind,
  pageSize,
  scope = 'all',
  isAdmin = false,
}: {
  kind: ContentKind;
  pageSize: number; // 6 для новостей, 4 для мероприятий
  scope?: 'upcoming' | 'past' | 'all'; // фильтр на будущее
  isAdmin?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();

  const getKey = (pageIndex: number, prev: PageResponse | null) => {
    if (prev && prev.items.length === 0) return null;
    return buildUrl(kind, pageIndex + 1, pageSize, scope);
  };

  const { data, size, setSize, isValidating, mutate } = useSWRInfinite<PageResponse>(getKey, fetcher, {
    revalidateFirstPage: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    keepPreviousData: true,
    dedupingInterval: 3000,
  });

  const pages = data ?? [];
  const items = pages.flatMap((p) => p.items);
  const total = pages[0]?.total ?? 0;
  const hasMore = items.length < total;
  const remaining = Math.max(0, total - items.length);
  const isFirstLoad = !data && isValidating;

  const handleAdd = () =>
    openModal('eventNewsUpdate', {
      data: { mode: 'create', kind },
      onSaved: async () => {
        await mutate(undefined, { revalidate: true });
      },
    });

  const collapseToFirst = () => {
    rootRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    setSize(1);
  };
  const loadMore = () => {
    setSize((s) => s + 1);
  };

  return (
    <section>
      <div
        ref={rootRef}
        className="mx-auto flex min-h-[900px] w-full flex-col gap-[30px] md:gap-[50px] lg:max-w-[850px] xl:max-w-[1110px]"
      >
        {isFirstLoad ? (
          <div className={clsx(st.cardContainer, kind === 'news' ? st.news : '')}>
            {Array.from({ length: pageSize }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="aspect-[53/30] w-full max-w-none overflow-hidden rounded-[10px] sm:rounded-[25px] md:max-w-[530px]" />
                <Skeleton className="h-6 w-1/3 rounded" />
                <Skeleton className="h-6 w-full rounded" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div layout className={clsx(st.cardContainer, kind === 'news' ? st.news : 'st.events')}>
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <EventNewsCard
                    kind={item.kind}
                    id={item.id}
                    image={item.image}
                    date={item.date}
                    title={item.title}
                    objectPosition={item.objectPosition}
                    isAdmin={isAdmin}
                    onChange={async () => {
                      await mutate(undefined, { revalidate: true });
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {total > 0 && (
          <div className="flex w-full justify-center">
            <button
              type="button"
              onClick={hasMore ? loadMore : collapseToFirst}
              aria-expanded={size > 1}
              disabled={isValidating && hasMore}
              className="cursor-pointer rounded-[10px] bg-[#FDB51B] px-[30px] py-[15px] transition duration-300 hover:bg-[#facc15]"
            >
              {hasMore ? `Показать ещё ${Math.min(remaining, pageSize)}` : size > 1 ? 'Скрыть' : 'Больше нет'}
            </button>
            {isAdmin && (
              <div className="ml-4">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="inline-flex h-full cursor-pointer items-center justify-center rounded-lg border px-3 py-2 hover:bg-gray-50"
                >
                  <IconCopyPlusFilled className="mr-2" />
                  {kind === 'news' ? 'Добавить новость' : 'Добавить мероприятие'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
