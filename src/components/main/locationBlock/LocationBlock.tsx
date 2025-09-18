"use client";

import CustomButton from "@/components/ui/customButton/CustomButton";
import { useModal } from "@/context/ModalContext";
import { cities, mainCity } from "@/constant/cities";
import Image from "next/image";
import st from "./styles.module.css";
import { useTranslations } from "next-intl";

export default function LocationBlock() {
  const { openModal } = useModal();
  const t = useTranslations("main.locationBlock");

  const handleOpen = (cityName: string) => {
    const found =
      cities.find((c) => c.name === cityName) ||
      mainCity.find((c) => c.name === cityName);

    if (found) openModal("city", { city: found });
  };

  return (
    <section className="w-full">
      <div className={st.locationBlock}>
        <div className={st.container}>
          <div className="flex flex-col gap-6 items-center">
            <h2 className={st.titleQuestion}>{t("questionTitle")}</h2>
            <div className={st.description}>
              <p>{t("description.line1")}</p>
              <p>{t("description.line2")}</p>
            </div>
            <a href="#form" className="flex justify-center">
              <CustomButton title={t("cta")} />
            </a>
          </div>

          <div className="flex flex-col gap-6 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-4 ">
              {mainCity.map((city, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOpen(city.name)}
                  className={`${st.cityLink} ${st.mainCity}`}
                >
                  {city.name}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 sm:gap-x-2">
              {cities.map((city, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOpen(city.name)}
                  className={st.cityLink}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Нижняя часть с описанием и фото */}
        <div className="w-full bg-[#ab0826]">
          <div className={st.aboutUsWrapper}>
            <div className={st.textBlock}>
              <h3 className={st.title}>{t("about.title")}</h3>
              <div className="flex flex-col">
                <p className={st.paragraph}>{t("about.community")}</p>
                <a href="https://moldovacenter.ru" className={st.link}>
                  {t("about.siteLabel")}
                </a>
              </div>
            </div>

            <div className={st.imageAboutUs}>
              <Image
                src="/images/main/moldova-couple.jpg"
                alt="young couple"
                width={400}
                height={400}
                className={st.image}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
