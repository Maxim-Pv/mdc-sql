"use client";

import PatternTitle from "@/components/culture/patternTitle/PatternTitle";
import HeaderNav from "@/components/headerNav/HeaderNav";
import CultureMetaTags from "@/lib/metaTags/CultureMetaTags";
import { useState } from "react";
import CuisineBlock from "../../culture/cuisineBlock/CuisineBlock";
import CultureDiasporaBlock from "../../culture/cultureDiaspora/CultureDiasporaBlock";
import CultureHeroBlock from "../../culture/cultureHeroBlock/CultureHeroBlock";
import MoldavianPatterns from "../../culture/moldavianPatterns/MoldavianPatterns";
import MusicAndDance from "../../culture/musicAndDance/MusicAndDance";
import TraditionsAndCustoms from "../../culture/traditionsAndCustoms/TraditionsAndCustoms";
import WineBlock from "../../culture/wineBlock/WineBlock";
import { CitizenCardForm } from "../../main/footer/citizenCardForm/CitizenCardForm";
import { useTranslations } from "next-intl";

export default function CulturePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("culture.patterns");
  return (
    <div className="flex flex-col gap-[40px] sm:gap-[70px] mb-[50px]">
      <CultureMetaTags />

      <HeaderNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <CultureHeroBlock menuOpen={menuOpen} />
      <PatternTitle title={t("traditionsTitle")} />
      <TraditionsAndCustoms />
      <PatternTitle title={t("musicTitle")} />
      <MusicAndDance />
      <PatternTitle title={t("patternsTitle")} />
      <MoldavianPatterns />
      <PatternTitle title={t("cuisineTitle")} />
      <CuisineBlock />
      <PatternTitle title={t("wineTitle")} />
      <WineBlock />
      <PatternTitle
        title={
          t.rich("cultureWorldTitle", {
            nowrap: (children: React.ReactNode) => (
              <span className="whitespace-nowrap">{children}</span>
            ),
          }) as React.ReactNode
        }
      />
      <CultureDiasporaBlock />
      <PatternTitle title={t("applyCardTitle")} />
      <div className="w-full flex justify-center py-[-30px] px-[15px] ">
        <p className="text-[16px] sm:text-[30px] text-[#333] text-center max-w-[890px]">
          {t("subtitle")}
        </p>
      </div>
      <CitizenCardForm />
    </div>
  );
}
