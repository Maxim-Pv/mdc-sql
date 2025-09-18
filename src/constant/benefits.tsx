export type BenefitCard = {
  id: number;
  img: string;
  title: string;
  listTitle: string;
  items: string[];
  note: string;
};

export function getBenefitsData(t: (key: string) => string): BenefitCard[] {
  return [
    {
      id: 1,
      img: "/images/main/sber-mobile.png",
      title: t("cards.1.title"),
      listTitle: t("cards.1.listTitle"),
      items: [
        t("cards.1.items.0"),
        t("cards.1.items.1"),
        t("cards.1.items.2"),
        t("cards.1.items.3"),
      ],
      note: t("cards.1.note"),
    },
    {
      id: 2,
      img: "/images/main/sber-prime.png",
      title: t("cards.2.title"),
      listTitle: t("cards.2.listTitle"),
      items: [t("cards.2.items.0"), t("cards.2.items.1"), t("cards.2.items.2")],
      note: t("cards.2.note"),
    },
    {
      id: 3,
      img: "/images/main/reso.png",
      title: t("cards.3.title"),
      listTitle: t("cards.3.listTitle"),
      items: [
        t("cards.3.items.0"),
        t("cards.3.items.1"),
        t("cards.3.items.2"),
        t("cards.3.items.3"),
      ],
      note: t("cards.3.note"),
    },
  ];
}
