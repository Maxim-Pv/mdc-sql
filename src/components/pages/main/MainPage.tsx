"use client";

import HeaderNav from "@/components/headerNav/HeaderNav";
import MainMetaTags from "@/lib/metaTags/MainMetaTags";
import { useState } from "react";
import BenefitsBlock from "../../main/benefitsBlock/BenefitsBlock";
import CardDescriptionBlock from "../../main/cardDescriptionBlock/CardDescriptionBlock";
import CardImplementedFor from "../../main/cardImplementedFor/CardImplementedFor";
import CitizenCardInfo from "../../main/citizenCardInfo/CitizenCardInfo";
import FAQBlock from "../../main/faqBlock/FAQBlock";
import { CitizenCardForm } from "../../main/footer/citizenCardForm/CitizenCardForm";
import HeroBlock from "../../main/heroBlock/HeroBlock";
import LocationBlock from "../../main/locationBlock/LocationBlock";
import PromoSlider from "../../main/promoSlider/PromoSlider";

export default function MainPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col gap-[40px] sm:gap-[75px]">
      <MainMetaTags />

      <HeaderNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroBlock menuOpen={menuOpen} />
      <CardImplementedFor />
      <CardDescriptionBlock />
      <CitizenCardInfo />
      <BenefitsBlock />
      <PromoSlider />
      <LocationBlock />
      <FAQBlock />
      <CitizenCardForm hasContacts />
      <div id="contacts" className="w-full mb-[55px]"></div>
    </div>
  );
}
