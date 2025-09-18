"use client";

import YandexMapDynamic from "@/components/maps/YandexMapDynamic";
import { City } from "@/types/city";
import { IconX } from "@tabler/icons-react";
import clsx from "clsx";
import { useEffect } from "react";
import st from "./styles.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  city?: City | null;
  className?: string;
}

export default function CityModal({
  isOpen,
  onClose,
  city,
  className,
}: ModalProps) {
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

  if (!isOpen || !city) return null;

  return (
    <div onClick={onClose} className={st.modalOverlay}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(st.modalContent, className)}
      >
        <button onClick={onClose} className={st.closeButton}>
          <IconX size={24} />
        </button>

        {city.coords ? (
          <div className={st.mapWrapper}>
            {isOpen && (
              <YandexMapDynamic
                coords={city.coords as [number, number]}
                name={city.name}
                className="w-full h-[270px] sm:h-[450px] lg:h-[500px]"
              />
            )}
          </div>
        ) : (
          <p className={st.noMap}>Карта пока недоступна для этого города.</p>
        )}
      </div>

      {city.address && (
        <div className={st.addressBlock}>
          <div className={st.addressTopRow}>
            <p>{city.address}</p>
            {city.phone && <span className={st.phone}>{city.phone}</span>}
          </div>
          {city.schedule && (
            <div className="text-[12px] sm:text-[16px]">
              <span className={st.scheduleLabel}>График работы:</span>{" "}
              <span className="">{city.schedule}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
