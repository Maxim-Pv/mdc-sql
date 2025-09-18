export function getApplyBlockData(t: (key: string) => string) {
  const requirements = [
    t("requirements.age"),
    t("requirements.citizen"),
    t("requirements.residence"),
  ];

  const advantageKeys = [
    "connection",
    "telemedicine",
    "prime",
    "sbercard",
    "business",
    "events",
    "legal",
    "youth",
  ] as const;

  const advantages = advantageKeys.map((k) => t(`advantages.${k}`));

  return {
    title: t("title"),
    requirements,
    advantages,
    alts: {
      arrowDesktop: t("alts.arrow_desktop"),
      arrowMobile: t("alts.arrow_mobile"),
      yellowCard: t("alts.yellow_card"),
      whiteCard: t("alts.white_card"),
    },
  };
}
