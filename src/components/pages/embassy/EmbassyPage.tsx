"use client";

import PatternTitle from "@/components/culture/patternTitle/PatternTitle";
import CasesForAppeal from "@/components/embassy/ebassyInfo/CasesForAppeal";
import ContactInfo from "@/components/embassy/ebassyInfo/ContactInfo";
import EmbassyHeroBlock from "@/components/embassy/heroBlock/EmbassyHeroBlock";
import MovingToRus from "@/components/embassy/movingToRus/MovingToRus";
import HeaderNav from "@/components/headerNav/HeaderNav";
import EmbassyMetaTags from "@/lib/metaTags/EmbassyMetaTags";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function EmbassyPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("embassy.pattern");
  return (
    <>
      <EmbassyMetaTags />
      <div className="flex flex-col gap-[40px] sm:gap-[70px]">
        <HeaderNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <EmbassyHeroBlock menuOpen={false} />
        <PatternTitle title={t("movingTitle")} />
        <MovingToRus />
        <PatternTitle title={t("embassyTitle")} />
        <CasesForAppeal />
        <ContactInfo />
      </div>
    </>
  );
}
