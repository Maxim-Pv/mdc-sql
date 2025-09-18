import Spinner from '@/components/ui/spinner/Spinner';
import { ContentItem, EventModalData } from '@/types/news';
import { IconX } from '@tabler/icons-react';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import st from './styles.module.css';
import { newsMdxMap } from '@/constant/news/registry';
import MdxProvider from '@/components/mdx/MdxProvider';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: EventModalData;
}

function isById(d: EventModalData | undefined): d is {
  id: string;
  kind?: 'news' | 'events';
  fallback?: { title?: string };
} {
  return !!d && typeof (d as any).id === 'string';
}

const fetcher = (url: string) =>
  fetch(url, { cache: 'no-store' }).then((r) => {
    if (!r.ok) throw new Error(`${r.status}`);
    return r.json();
  });

function MdxBody({ slug }: { slug: string }) {
  const [Comp, setComp] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = newsMdxMap[slug];
    if (!loader) return;
    loader().then((mod) => {
      if (!cancelled) setComp(() => mod.default);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!Comp) return <Spinner size={40} color="#FDB51B" />;
  return (
    <MdxProvider>
      <Comp />
    </MdxProvider>
  );
}

export default function EventNewsModal({ isOpen, onClose, data }: EventModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const id = isById(data) ? data.id : undefined;
  const fallbackTitle = isById(data) ? data.fallback?.title : undefined;
  const kind = (isById(data) && data.kind) || 'news';
  const key = isOpen && id ? `/api/news/${encodeURIComponent(id)}` : null;

  const { data: fetched, isLoading, error } = useSWR<ContentItem>(key, fetcher);

  const item: ContentItem | null = useMemo(() => {
    if (fetched) return fetched;

    if (id) {
      return {
        id,
        kind,
        date: '',
        title: fallbackTitle ?? '…',
      } as ContentItem;
    }

    // legacy-открытие без id
    if (data && !id) {
      const legacy = data as any;
      return {
        id: 'legacy',
        kind: 'news',
        date: '',
        title: legacy.title ?? '',
        text: legacy.text,
      } as ContentItem;
    }

    return null;
  }, [fetched, id, kind, fallbackTitle, data]);

  if (!isOpen) return null;

  if (id && isLoading && !item) {
    return (
      <div onClick={onClose} className={st.modalOverlay}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={clsx(st.modalContent)}
          role="dialog"
          aria-modal="true"
          aria-label="Загрузка"
        >
          <button onClick={onClose} className={st.closeButton}>
            <IconX size={24} />
          </button>
          <div className="flex min-h-[200px] w-full items-center justify-center sm:min-h-[400px]">
            <Spinner size={40} color="#FDB51B" />
          </div>
        </div>
      </div>
    );
  }

  if (!item) return null;

  const Body = () => {
    // if (item.body) return <TinaMarkdown content={item.body} components={{ /* маппинг */ }} />;
    if (item.mdxSlug) return <MdxBody slug={item.mdxSlug} />;
    if (item.text) return <div className="whitespace-pre-line">{item.text}</div>;
    return (
      <div className="flex min-h-[200px] w-full items-center justify-center sm:min-h-[400px]">
        <Spinner size={40} color="#FDB51B" />
      </div>
    );
  };

  return (
    <div onClick={onClose} className={st.modalOverlay}>
      <div
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className={clsx(st.modalContent)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
      >
        <button onClick={onClose} className={st.closeButton}>
          <IconX size={24} />
        </button>
        <h2 className={st.title}>{item.title}</h2>

        <div className={st.bodyScroll}>
          <div className="space-y-3 text-sm leading-relaxed lg:text-base">
            <Body />
          </div>
        </div>
      </div>
    </div>
  );
}
