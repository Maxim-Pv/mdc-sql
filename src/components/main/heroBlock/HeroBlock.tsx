"use client";

import Image from "next/image";
import st from "./styles.module.css";
import CustomButton from "@/components/ui/customButton/CustomButton";
import { useTranslations } from "next-intl";

export default function HeroBlock({ menuOpen }: { menuOpen: boolean }) {
  const t = useTranslations("main.hero");
  return (
    <section className="relative flex justify-center w-full min-h-[50vh] xl:h-[80vh] xxl:h-[100vh] text-white overflow-hidden rounded-b-[24px] ">
      <div className={st.backgroundImg}>
        <Image
          src="/images/main/hero-bg.jpg"
          alt="Фон с вышивкой"
          fill
          sizes="(min-width: 1441px) 0px, 100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className={st.heroSection}>
        <div className={st.heroContent}>
          <div className={st.heroTitleBlock}>
            <h1 className={st.heroTitle}>{t("title")}</h1>
            <p className="text-[15px] sm:text-[16px] xl:text-[32px] pb-[40px] mt-6 px-[15px] sm:px-0">
              {t("subtitle")}
            </p>
          </div>
          <a href="#form" className="flex justify-center sm:block">
            <CustomButton title={t("cta")} />
          </a>
        </div>
      </div>

      <div className={st.phoneImgWrapper}>
        <img
          src="/images/main/phone-mobile.png"
          alt="Phone"
          className={st.phoneImgMobile}
        />
        <img
          src="/images/main/phone.png"
          alt="Phone"
          className={st.phoneImgDesktop}
        />
      </div>
    </section>
  );
}
