import { cities, mainCity } from "@/constant/cities";
import { useModal } from "@/context/ModalContext";
import { useTranslations } from "next-intl";
import st from "./styles.module.css";

export default function MoldovanDiaspora() {
  const { openModal } = useModal();
  const t = useTranslations("embassy.diaspora");

  const handleOpen = (cityName: string) => {
    const found =
      cities.find((c) => c.name === cityName) ||
      mainCity.find((c) => c.name === cityName);

    if (found) openModal("city", { city: found });
  };
  return (
    <section className="w-full flex flex-col items-center max-w-[1110px]">
      <div className="justify-center flex flex-col items-center gap-[50px] sm:gap-[70px]">
        <h3 className="text-[20px] sm:text-[30px] font-semibold text-center px-[20px] max-w-[1030px]">
          {t("title")}
        </h3>
        <div className="w-full flex flex-col gap-[20px] text-center justify-center max-w-[1030px] text-sm sm:text-base px-[15px]">
          <p>{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
        </div>
        <div className={st.activeCity}>
          <h3 className="text-[20px] leading-[100%] uppercase text-center flex-1 md:flex-initial">
            {/* Города с активными молдавскими <br className="lg:hidden" />{" "}
            общинами:  */}
            {t("activeCitiesTitle")}
          </h3>

          <div className="flex flex-col gap-6 justify-start w-fit pl-[30px] pb-[20px]">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 justify-items-start">
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
            <div className="grid grid-cols-2 gap-y-3 sm:grid-cols-4 md:grid-cols-2 sm:gap-x-2 justify-items-start">
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

          <p className="text-xs sm:text-base text-center sm:px-[20px]">
            {t("footer")}
          </p>
        </div>
      </div>
    </section>
  );
}
