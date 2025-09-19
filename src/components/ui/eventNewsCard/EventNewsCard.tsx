'use client';

import { useModal } from '@/context/ModalContext';
import { ContentKind } from '@/types/news';
import Image from 'next/image';
import { ReactNode } from 'react';

export interface Props {
  id: string;
  kind: ContentKind;
  image?: string;
  date?: string;
  title: string;
  objectPosition?: string;
  fallbackContent?: ReactNode; // на будущее
}

export default function EventNewsCard({ id, kind, image, date, title, objectPosition }: Props) {
  const { openModal } = useModal();

  const handleOpen: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    openModal('eventNews', {
      data: {
        id,
        kind,
        fallback: { title },
      } as any,
    });
  };

  return (
    <div
      className="flex cursor-pointer flex-col gap-1 focus:outline-none sm:gap-3"
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpen(e as any)}
    >
      {image && (
        <div className="relative aspect-[53/30] w-full max-w-none overflow-hidden rounded-[10px] sm:rounded-[25px] md:max-w-[530px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            style={{ objectPosition: objectPosition || 'center' }}
            sizes="(max-width: 768px) 100vw, 530px"
          />
        </div>
      )}
      {date && <span className="text-xs leading-[24px] text-[#234BA0] sm:text-sm">{date}</span>}
      <h3 className="text-sm leading-[24px] font-semibold sm:text-base">{title}</h3>
    </div>
  );
}
