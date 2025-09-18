"use client";

import { AnimatePresence, motion } from "framer-motion";
import useSWRInfinite from "swr/infinite";
import { useRef } from "react";
import EventNewsCard, { ContentKind } from "@/components/ui/eventNewsCard/EventNewsCard";
import st from "./styles.module.css";
import clsx from "clsx";
import { ContentItem } from "@/types/news";

export type PageResponse = {
  items: ContentItem[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};

const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then((r) => r.json());

export default function ContentFeed({
  kind,
  pageSize,
}: {
  kind: ContentKind;
  pageSize: number; // 6 для новостей, 4 для мероприятий
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  const getKey = (pageIndex: number, prev: PageResponse | null) => {
    if (prev && prev.items.length === 0) return null;
    return `/api/news?kind=${kind}&page=${pageIndex + 1}&limit=${pageSize}`;
  };

  const { data, size, setSize, isValidating } = useSWRInfinite<PageResponse>(getKey, fetcher, {
    revalidateFirstPage: false,
  });

  const pages = data ?? [];
  const items = pages.flatMap((p) => p.items);
  const total = pages[0]?.total ?? 0;
  const hasMore = items.length < total;
  const remaining = Math.max(0, total - items.length);

  const toggle = () => {
    if (size > 1) {
      rootRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
      setSize(1);
    } else {
      setSize(size + 1);
    }
  };

  return (
    <section>
      <div ref={rootRef} className="w-full lg:max-w-[850px] xl:max-w-[1110px] flex flex-col gap-[30px] md:gap-[50px] mx-auto min-h-[900px]">
        <motion.div layout className={clsx(st.cardContainer, kind === "news" ? st.news : "st.events")}>
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
                <EventNewsCard kind={kind} id={item.id} image={item.image} date={item.date} title={item.title} objectPosition={item.objectPosition} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {total > 0 && (
          <div className="w-full flex justify-center">
            <button
              type="button"
              onClick={toggle}
              aria-expanded={size > 1}
              disabled={isValidating && hasMore}
              className="bg-[#FDB51B] px-[30px] py-[15px] rounded-[10px] cursor-pointer hover:bg-[#facc15] trancition duration-300"
            >
              {size > 1 ? "Скрыть" : hasMore ? `Показать ещё ${Math.min(remaining, pageSize)}` : "Больше нет"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
