"use client";

import React, { useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import clsx from "clsx";
import st from "./styles.module.css";
import { useTranslations } from "next-intl";

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function ConsentModal({
  isOpen,
  onClose,
  className,
}: ConsentModalProps) {
  const t = useTranslations("consentModal");

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

  if (!isOpen) return null;

  const steps = t.raw("steps") as Array<{
    title: string;
    text: string;
    list?: string[];
  }>;

  return (
    <div onClick={onClose} className={st.modalOverlay}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(st.modalContent, className)}
      >
        <button onClick={onClose} className={st.closeButton}>
          <IconX size={24} />
        </button>

        <h2 className="text-lg font-bold mb-4">{t("heading")}</h2>

        <div
          className={clsx(
            "text-sm text-gray-800 max-h-[70vh] overflow-y-auto space-y-3",
            st.scrollArea
          )}
        >
          <p>{t("intro")}</p>

          {steps.map((step, idx) => (
            <div key={idx} className="space-y-2">
              <p>
                <strong>{step.title}</strong> {step.text}
              </p>
              {Array.isArray(step.list) && (
                <ul className="list-disc pl-5">
                  {step.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
