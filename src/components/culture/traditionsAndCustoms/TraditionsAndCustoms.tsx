"use client";

import CustomButton from "@/components/ui/customButton/CustomButton";
import {
  TraditionCard,
  useTraditionCards,
} from "@/components/hooks/useTraditionCards";
import { IconChevronDown } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function TraditionsAndCustoms() {
  const t = useTranslations("culture.traditions");
  const cards: TraditionCard[] = useTraditionCards();
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);
  const toggleCard = (idx: number) => {
    setOpenCardIndex(openCardIndex === idx ? null : idx);
  };

  return (
    <div className="w-full justify-center flex flex-col items-center">
      <div className="flex flex-col gap-[20px] max-w-[1110px] mx-[20px] sm:mx-[25px]">
        {cards.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-[clamp(15px,3vw,30px)] rounded-[20px] grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-[clamp(20px,4vw,40px)] gap-5 sm:gap-y-0"
          >
            <div
              className={`flex flex-1 flex-col order-1 sm:order-0 ${
                openCardIndex === idx ? "gap-5 lg:gap-[20px]" : "gap-[20px]"
              }`}
            >
              <h3 className="text-[14px] sm:text-[16px] font-semibold text-[#234BA0]">
                {item.title}
              </h3>
              <p className="text-[14px] sm:text-[16px] text-[#333]">
                {item.text}
              </p>
            </div>
            <div className="order-0 w-full sm:w-[clamp(240px,25vw,300px)] sm:h-full lg:max-h-[160px] aspect-[3/1.6] relative rounded-[clamp(10px,1.5vw,25px)] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 640px) 25vw, 100vw"
                className="object-cover"
              />
            </div>
            {openCardIndex === idx && item.details && (
              <div className="sm:col-span-2 sm:mt-4 text-[14px] sm:text-[16px] text-[#333] space-y-4 mb-[clamp(20px,4vw,60px)]">
                {item.details}
              </div>
            )}
            {item.details && (
              <button
                onClick={() => toggleCard(idx)}
                className="order-2 w-fit transition-transform cursor-pointer mt-0 lg:mt-[-20px]"
              >
                <IconChevronDown
                  color="#234BA0"
                  className={`transition-transform duration-300 ${
                    openCardIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>
        ))}
        <div className="text-center flex flex-col items-center gap-[clamp(20px,2vw,30px)] pt-[clamp(40px,5vw,70px)]">
          <p className="text-[14px] sm:text-[16px]">{t("cta.title")}</p>
          <a href="#form" className="flex justify-center sm:block">
            <CustomButton title={t("cta.button")} />
          </a>
          <p className="w-[80%] text-[14px] sm:text-[16px]">
            {t("cta.subtitle")}
          </p>
        </div>
      </div>
    </div>
  );
}
