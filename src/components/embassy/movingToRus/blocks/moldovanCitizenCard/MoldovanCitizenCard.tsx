import { useTranslations } from "next-intl";
import st from "./styles.module.css";

export default function MoldovanCitizenCard() {
  const t = useTranslations("embassy.card");
  return (
    <section className="flex flex-col items-center gap-[25px] sm:gap-[40px] mx-[15px] w-full max-w-[1110px]">
      <h3 className="text-[16px] sm:text-[26px] lg:text-[30px] text-center max-w-[980px] px-[10px] lg:px-0">
        <span className="text-[#234BA0]">{t("titleHighlight")}</span> —{" "}
        {t("title")}
      </h3>
      <p className="text-[14px] sm:text-[16px] text-center max-w-[960px] px-[10px] lg:px-0">
        {t("description")}
      </p>

      <div className={st.cardBenefits}>
        <div className="flex flex-col sm:max-w-[290px] md:max-w-[50%] sm:h-full lg:h-[200px] gap-[10px] bg-white rounded-[10px] sm:rounded-[25px] p-[12px] sm:p-[20px] text-xs sm:text-base">
          <span>{t("benefitsTitle")}</span>
          <ul className="list-disc list-inside pl-2">
            <li>{t("benefits.0")}</li>
            <li>{t("benefits.1")}</li>
          </ul>
          <p>{t("footer")}</p>
        </div>

        <div className="absolute z-0 inset-0 flex items-end justify-start sm:justify-start sm:items-center pointer-events-none">
          <img
            src="/images/embassy/card-in-hand-right.webp"
            alt="Карта гражданина Молдовы"
            className="w-full max-h-[430px] max-w-[410px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] translate-y-[20%] md:translate-y-[10%] sm:translate-y-0"
          />
        </div>
      </div>
    </section>
  );
}
