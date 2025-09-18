export interface PromoData {
  title: string;
  highlight?: string;
  paragraphs: string[];
  footnote?: string;
  image: string;
  backgroundColor: string;
}

export function getPromoItems(t: (key: string) => string): PromoData[] {
  return [
    {
      highlight: t("0.highlight"),
      title: t("0.title"),
      paragraphs: [t("0.p1"), t("0.p2")],
      footnote: t("0.footnote"),
      image: "/images/main/card-and-boom.webp",
      backgroundColor: "#234BA0",
    },
    {
      highlight: t("1.highlight"),
      title: t("1.title"),
      paragraphs: [t("1.p1"), t("1.p2")],
      footnote: t("1.footnote"),
      image: "/images/main/card-and-ticket.webp",
      backgroundColor: "#ED1846",
    },
  ];
}
