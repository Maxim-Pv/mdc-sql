"use client";

import { useModal } from "@/context/ModalContext";
import Image from "next/image";
import { ReactNode } from "react";

export type ContentKind = "news" | "events";

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
    openModal("eventNews", {
      data: {
        id,
        kind,
        fallback: { title },
      } as any,
    });
  };

  return (
    <div
      className="flex flex-col gap-1 sm:gap-3 cursor-pointer focus:outline-none"
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpen(e as any)}
    >
      {image && (
        <div className="relative w-full max-w-none md:max-w-[530px] aspect-[53/30] overflow-hidden rounded-[10px] sm:rounded-[25px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover "
            style={{ objectPosition: objectPosition || "center" }}
            sizes="(max-width: 768px) 100vw, 530px"
          />
        </div>
      )}
      {date && <span className="text-[#234BA0] text-xs sm:text-sm leading-[24px]">{date}</span>}
      <h3 className="leading-[24px] font-semibold text-sm sm:text-base">{title}</h3>
    </div>
  );
}
