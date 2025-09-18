"use client";

import DetailBlock from "@/components/ui/DetailBlock";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

export interface TraditionCard {
  title: string;
  text: string;
  image: string;
  details?: ReactNode;
}

const IMAGE_MAP = [
  "/images/culture/church.webp",
  "/images/culture/wedding.webp",
  "/images/culture/martisor.webp",
];

export function useTraditionCards(): TraditionCard[] {
  const t = useTranslations("culture.traditions");
  const rawCards = t.raw("cards");
  const cardsArray: unknown[] = Array.isArray(rawCards) ? rawCards : [];

  return cardsArray.map((cardRaw, cardIndex) => {
    let detailsNode: ReactNode | undefined;

    // Защитное приведение к ожидаемой структуре
    const cardObj = cardRaw as any;

    if (Array.isArray(cardObj?.details)) {
      const detailsArray = cardObj.details as any[];
      detailsNode = (
        <div className="flex flex-col gap-4 text-[14px] sm:text-[16px] text-[#333]">
          {detailsArray.map((detailRaw, detailIndex) => {
            if (detailRaw?.type === "block") {
              return (
                <div key={detailIndex}>
                  {detailRaw.title && (
                    <DetailBlock title={detailRaw.title} list={detailRaw.list}>
                      {Array.isArray(detailRaw.content) &&
                        detailRaw.content.map(
                          (contentChunk: any, contentIndex: number) => {
                            if (contentChunk?.type === "paragraph") {
                              return (
                                <p key={contentIndex} className="mb-2">
                                  {contentChunk.text}
                                </p>
                              );
                            }
                            if (contentChunk?.type === "list") {
                              return (
                                <ul
                                  key={contentIndex}
                                  className="list-disc pl-6 mb-2"
                                >
                                  {Array.isArray(contentChunk.items) &&
                                    contentChunk.items.map(
                                      (
                                        listItem: string,
                                        listItemIndex: number
                                      ) => (
                                        <li key={listItemIndex}>{listItem}</li>
                                      )
                                    )}
                                </ul>
                              );
                            }
                            return null;
                          }
                        )}
                    </DetailBlock>
                  )}
                </div>
              );
            }

            if (detailRaw?.type === "paragraph") {
              return (
                <p key={detailIndex} className="mb-2">
                  {detailRaw.text}
                </p>
              );
            }

            return null;
          })}
        </div>
      );
    }

    return {
      title: cardObj?.title ?? "",
      text: cardObj?.text ?? "",
      image: IMAGE_MAP[cardIndex] || "",
      details: detailsNode,
    } as TraditionCard;
  });
}
