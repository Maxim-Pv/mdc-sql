import Image from "next/image";
import st from "./styles.module.css";
import { useTranslations } from "next-intl";

export default function CardImplementedFor() {
  const t = useTranslations("main.cardImplementedFor");
  return (
    <section className="relative overflow-hidden w-full">
      <div className="max-w-[1000px] xl:max-w-[1200px] mx-auto text-center sm:mb-10 sm:px-4">
        <h2 className="p-[10px] text-[24px] md:text-[32px] text-black font-medium lg:max-w-[900px] xl:max-w-[1100px] mx-auto ">
          {t("title_part1")}
          <span className="text-[#234BA0]"> {t("title_highlight")}</span>
        </h2>

        <div className="flex justify-center my-[29px]">
          <img src="/icons/arrow-down.svg" alt="arrow" />
        </div>

        <p className="inline-block bg-white rounded-[20px] sm:py-[18px] p-[20px] sm:px-[10px] text-[#234BA0] text-[22px] leading-[22px] max-w-[490px]">
          {t("subtitle")}
        </p>
      </div>
      <div className={st.patternWrapper}>
        <div className={st.patternTrack}>
          {Array.from({ length: 20 }).map((_, i) => (
            <Image
              key={i}
              src="/icons/pattern.svg"
              width={600}
              height={170}
              alt="pattern"
              className={st.patternImage}
              unoptimized
            />
          ))}
        </div>
      </div>
    </section>
  );
}
