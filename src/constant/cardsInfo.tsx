export function getCardsInfo(t: (key: string) => string) {
  return [
    {
      title: t("cards.connection.title"),
      text: t("cards.connection.text"),
      imgSrc: "/images/main/horses.jpg",
    },
    {
      title: t("cards.homeland.title"),
      text: t("cards.homeland.text"),
      imgSrc: "/images/main/grape.jpg",
    },
    {
      title: t("cards.reliability.title"),
      text: t("cards.reliability.text"),
      imgSrc: "/images/main/red-white.jpg",
    },
  ];
}
