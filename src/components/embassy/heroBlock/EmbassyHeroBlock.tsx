"use client";

import { useTranslations } from "next-intl";
import st from "./styles.module.css";

export default function EmbassyHeroBlock({ menuOpen }: { menuOpen: boolean }) {
  const t = useTranslations("embassy.hero");
  return (
    <section>
      <div className={st.titleContainer}>
        <h1 className={st.heroTitle}>
          {t
            .raw("title")
            .split("\n")
            .map((line: string, idx: number) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
        </h1>
      </div>
      <p className="text-[clamp(16px,2vw,30px)] max-w-[1050px] text-center mx-auto mt-[40px] px-[15px]">
        <span className="text-[#234BA0]">
          {t("subtitle").split("—")[0].trim()}
        </span>{" "}
        — {t("subtitle").split("—")[1].trim()}
      </p>
    </section>
  );
}
