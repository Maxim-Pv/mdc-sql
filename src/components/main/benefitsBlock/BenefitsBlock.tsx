import { getBenefitsData } from "@/constant/benefits";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";
import st from "./styles.module.css";
import { parseRichText } from "@/lib/parseRichText";

export default function BenefitsBlock() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const t = useTranslations("main.benefits");
  const benefits = getBenefitsData(t);

  return (
    <section className="mx-[16px] xl:mx-[40px]">
      <div className="max-w-[1140px] mx-auto text-center">
        <h2 className="text-[26px] lg:text-[44px] font-medium sm:mb-[40px]">
          {t("title")}
        </h2>

        <div className="mt-[50px] grid grid-cols-1 lg:grid-cols-3 gap-[60px] lg:gap-6">
          {benefits.map(({ id, img, title, listTitle, items, note }) => {
            const isActive = activeId === id;
            return (
              <div
                key={id}
                onMouseEnter={() => setActiveId(id)}
                onMouseLeave={() => setActiveId(null)}
                className={clsx(
                  "relative rounded-[24px] px-[20px] lg:px-[28px] cursor-pointer transition-all duration-500 pb-[40px]",
                  isActive
                    ? "bg-[#FDB51B] text-white max-h-[650px]"
                    : "bg-[#EB1F48] text-white max-h-[200px] lg:max-h-[180px] "
                )}
              >
                <div className={st.logoFloatingBox}>
                  <img
                    src={img}
                    alt="logo"
                    className="max-h-[60px] object-contain"
                  />
                </div>

                <div className="flex flex-col h-full gap-[40px]">
                  <p className="text-left sm:text-[17px] lg:text-[16px] leading-[20px] font-medium pt-[60px] xl:pt-[80px]">
                    {title}
                  </p>

                  <div
                    className={clsx(
                      "text-left text-[15px] leading-[20px] justify-between h-full flex flex-col transition-all duration-500 overflow-hidden",
                      isActive
                        ? "opacity-100 max-h-[500px]"
                        : "opacity-0 max-h-0"
                    )}
                  >
                    <div className="flex-1">
                      <p className="pb-[10px]">{listTitle}</p>
                      <ul className="list-disc ml-4 space-y-2 py-[10px]">
                        {items.map((item, i) => (
                          <li key={i}>{parseRichText(item)}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <hr className="my-4 border-white/50" />
                      <p className="text-sm text-white">{note}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
