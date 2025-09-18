"use client";

import Image from "next/image";
import st from "./styles.module.css";
import { useTranslations } from "next-intl";

export default function CultureHeroBlock({ menuOpen }: { menuOpen: boolean }) {
  const t = useTranslations("culture.hero");
  return (
    <section className="overflow-x-clip">
      <div className="relative flex justify-center w-full max-h-[600px] xl:h-auto text-white overflow-hidden rounded-b-[24px]">
        <div className={st.backgroundImg}>
          <Image
            src="/images/main/hero-bg.jpg"
            alt="Фон с вышивкой"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className={st.heroSection}>
          <div className={st.heroContent}>
            <h1 className={st.heroTitle}>
              {t("titlePrefix")}
              <br />
              {t("titleSuffix")}
            </h1>
            <p className={st.heroSubtitle}>{t("subtitle")}</p>
          </div>
        </div>
      </div>
      <div className={st.description}>
        <p>{t("description")}</p>
      </div>
    </section>
  );
}
