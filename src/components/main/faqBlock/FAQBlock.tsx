"use client";

import { buildFaqData, FAQItem } from "@/constant/FAQData";
import { parseRichText } from "@/lib/parseRichText";
import { IconPlus, IconX } from "@tabler/icons-react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import st from "./styles.module.css";

export default function FAQBlock() {
  const t = useTranslations("main.faq");

  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const rawItems = t.raw("items");
    if (Array.isArray(rawItems)) {
      setFaqData(buildFaqData(rawItems));
    } else {
      console.warn(
        "Ожидался массив faq.items в переводах, но получили:",
        rawItems
      );
      setFaqData([]);
    }
  }, [t]);

  const toggleItem = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const visibleItems = showAll ? faqData : faqData.slice(0, 3);

  return (
    <section className="w-full py-8 sm:py-12">
      <div className="max-w-[1200px] flex flex-col justify-center mx-auto ">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10">
          {t("heading")}
        </h2>

        <div className="space-y-4">
          {visibleItems.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div key={index} className={clsx(st.faqItem, "group")}>
                <button
                  onClick={() => toggleItem(index)}
                  className="flex justify-between items-center w-full text-left gap-2 cursor-pointer"
                >
                  <h3 className={st.faqQuestion}>{item.question}</h3>
                  <div
                    className={clsx(
                      `${st.iconWrapper} group-hover:bg-[#EAEAEA]`,
                      isOpen ? "rotate-45" : "rotate-0"
                    )}
                  >
                    {isOpen ? <IconX size={25} /> : <IconPlus size={25} />}
                  </div>
                </button>

                <div
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  className={clsx(
                    st.answerWrapper,
                    isOpen && st.answerWrapperOpen
                  )}
                  style={{
                    maxHeight: isOpen
                      ? `${contentRefs.current[index]?.scrollHeight}px`
                      : "0px",
                  }}
                >
                  <div className="space-y-2">
                    {item.answer.map((block, bi) => {
                      if (block.type === "paragraph") {
                        return <p key={bi}>{parseRichText(block.text)}</p>;
                      }
                      if (block.type === "list") {
                        return (
                          <ul
                            key={bi}
                            className={clsx(
                              "list-disc list-inside ml-4",
                              typeof block.items[0] === "string"
                                ? "space-y-1"
                                : "space-y-2"
                            )}
                          >
                            {block.items.map((it, ii) => {
                              if (typeof it === "string") {
                                return <li key={ii}>{parseRichText(it)}</li>;
                              } else {
                                return (
                                  <li key={ii}>
                                    <span className="text-[#234BA0] font-medium">
                                      {it.title}
                                    </span>
                                    <br />
                                    {it.text}
                                  </li>
                                );
                              }
                            })}
                          </ul>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {faqData.length > 3 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-block bg-[#234BA0] text-white px-6 py-2 rounded-[10px] text-sm sm:text-base cursor-pointer hover:opacity-80 transition"
            >
              {showAll ? t("hide") : t("show_more")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
