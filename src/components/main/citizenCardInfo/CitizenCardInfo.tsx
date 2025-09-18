import CustomButton from "@/components/ui/customButton/CustomButton";
import { getApplyBlockData } from "@/constant/getApplyData";
import { useTranslations } from "next-intl";
import st from "./styles.module.css";

export default function CitizenCardInfo({
  onClickToForm,
}: {
  onClickToForm?: () => void;
}) {
  const t = useTranslations("main.apply");
  const { title, requirements, advantages, alts } = getApplyBlockData(t);
  return (
    <section className="xl:mx-[40px]">
      <div className="max-w-[1140px] mx-auto text-center">
        <h2 className="text-[26px] lg:text-[44px] font-medium mb-[28px] sm:mb-[40px]">
          {title}
        </h2>

        <div className="relative">
          <div className="relative rounded-[24px] overflow-hidden z-0">
            {/* Фоновый слой */}
            <div className={st.backgroundLayer} />
            <div className="flex flex-col gap-[20px] lg:flex-row items-center sm:items-start lg:items-end justify-between relative px-[20px] h-full pb-[20px] sm:p-[30px]">
              <div className={st.requirementsBlock}>
                {requirements.map((r, i) => (
                  <span key={i}>{r}</span>
                ))}
              </div>

              <div className={st.visualBlock}>
                <img
                  src="/icons/union-arrow.svg"
                  alt="arrow"
                  className="hidden lg:block xl:w-[200px]"
                />
                <img
                  src="/icons/union-arrow-mobile.svg"
                  alt="arrow"
                  className={st.arrowMobile}
                />

                <ul className={st.advantagesList}>
                  {advantages.map((text, i) => (
                    <li key={i} className="lg:p-[10px]">
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Наложение с картами */}
          <div className="absolute top-0 left-0 w-full h-auto pointer-events-none z-20">
            <div className="relative top-4 sm:top-10 pointer-events-auto">
              <img
                src="/images/main/yellow-card.png"
                alt={alts.yellowCard}
                className={st.yellowCard}
                style={{
                  filter: "drop-shadow(9px -4px 10.1px rgba(0, 0, 0, 1))",
                }}
              />
              <img
                src="/images/main/white-card.jpg"
                alt={alts.whiteCard}
                className={st.whiteCard}
                style={{
                  filter: "drop-shadow(8px -6px 4.1px rgba(0, 0, 0, 0.25))",
                }}
              />
            </div>
          </div>
        </div>

        <a
          href="#form"
          className="flex justify-center mx-[10px] sm:mx-0 mt-[15px] sm:mt-[20px] md:mt-[60px]"
        >
          <CustomButton title={t("cta")} className="max-w-[500px]" />
        </a>
      </div>
    </section>
  );
}
