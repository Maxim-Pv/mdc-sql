import ProseMarkdown from '@/components/ui/ProseMarkdown';
import Spinner from '@/components/ui/spinner/Spinner';
import { ContentItem, ContentKind, EventModalData } from '@/types/news';
import { IconX } from '@tabler/icons-react';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import useSWR from 'swr';
import st from './styles.module.css';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: EventModalData;
}

function isById(d: EventModalData | undefined): d is {
  id: string;
  kind?: ContentKind;
  fallback?: { title?: string };
} {
  return !!d && typeof (d as any).id === 'string';
}

const fetcher = (url: string) =>
  fetch(url, { cache: 'no-store' }).then((r) => {
    if (!r.ok) throw new Error(`${r.status}`);
    return r.json();
  });

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
  const kind = (isById(data) && data.kind) || 'news';
  const key = isOpen && id ? `/api/content/${encodeURIComponent(id)}?kind=${kind}` : null;
  const fallbackTitle = isById(data) ? data.fallback?.title : undefined;

  const { data: fetched, isLoading, error } = useSWR<ContentItem>(key, fetcher);

  const item: ContentItem | null = useMemo(() => {
    if (fetched) return fetched;
    if (id) return { id, kind, date: '', title: fallbackTitle ?? '…' } as ContentItem;
    return null;
  }, [fetched, id, kind, fallbackTitle]);

  if (!isOpen) return null;
  if (!item) return null;

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
        <button onClick={onClose} className={st.closeButton} aria-label="Закрыть">
          <IconX size={24} />
        </button>
        <h2 id="event-modal-title" className={st.title}>
          {item.title}
        </h2>

        <div className={st.bodyScroll}>
          <div className="space-y-3 text-sm leading-relaxed lg:text-base">
            {item.body ? (
              <ProseMarkdown markdown={item.body} />
            ) : (
              <div className="flex min-h-[200px] w-full items-center justify-center sm:min-h-[400px]">
                <Spinner size={40} color="#FDB51B" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
