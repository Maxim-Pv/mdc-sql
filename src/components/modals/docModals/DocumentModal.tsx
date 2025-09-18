"use client";

import Image from "next/image";
import { useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import clsx from "clsx";
import st from "./styles.module.css";

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
    text: string;
    image: string;
  };
  className?: string;
}

export default function DocumentModal({
  isOpen,
  onClose,
  data,
  className,
}: DocumentModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !data) return null;

  return (
    <div onClick={onClose} className={st.modalOverlay}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(st.modalContent, className)}
      >
        <button onClick={onClose} className={st.closeButton}>
          <IconX size={24} />
        </button>

        <h2 className="text-[16px] font-semibold mb-[20px] mr-[20px] gap-[25px] sm:mb-[40px]">
          {data.title}
        </h2>
        <div className="flex flex-col md:flex-row gap-[25px] lg:gap-[40px]">
          <div className="relative w-full md:max-w-[250px] h-[170px] md:h-auto">
            <Image
              src={data.image}
              alt={data.title}
              fill
              sizes="(max-width: 768px) 100vw, (min-width: 769px) 250px"
              className="object-cover rounded-lg"
            />
          </div>

          <p className="text-[14px] lg:leading-[1.3] sm:text-[16px] whitespace-pre-line overflow-y-auto max-h-[300px]">
            {data.text}
          </p>
        </div>
      </div>
    </div>
  );
}
