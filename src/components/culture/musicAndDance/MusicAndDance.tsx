import { useDanceContent } from "@/components/hooks/useDanceContent";
import { useMusicCards } from "@/components/hooks/useMusicCards";
import { useTranslations } from "next-intl";
import Image from "next/image";
import st from "./styles.module.css";

export default function MusicAndDance() {
  const t = useTranslations("culture.music");
  const musicCards = useMusicCards();
  const {
    title: danceTitle,
    intro: danceIntro,
    lead: danceLead,
    list: danceList,
    conclusion: danceConclusion,
  } = useDanceContent();

  return (
    <div className="w-full flex flex-col justify-center">
      <div className=" max-w-[1020px] mx-auto">
        <div className="flex flex-col gap-[clamp(30px,4vw,70px)] mx-[15px]">
          <div className="flex flex-col gap-[clamp(30px,4vw,70px)] text-center">
            <h2 className="text-[clamp(18px,4vw,30px)] font-semibold leading-tight">
              {t("hero.title")}
            </h2>
            <p className="text-[14px] sm:text-[16px] text-[#333]">
              {t("hero.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(16px,3vw,35px)]">
            {musicCards.slice(0, 2).map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-[clamp(20px,3vw,25px)] rounded-[20px] flex flex-col"
              >
                <div className="flex-1 flex flex-col gap-[clamp(20px,2vw,40px)] mb-[20px]">
                  <h3 className="text-center md:text-left text-[clamp(14px,1.5vw,18px)] font-semibold text-[#234BA0]">
                    {item.title}
                  </h3>
                  <div className="relative w-full aspect-[4/2.7] rounded-[clamp(10px,1.5vw,25px)] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="text-[14px] sm:text-[16px] text-[#333]">
                  {item.text}
                </p>
              </div>
            ))}

            <div className="bg-white sm:col-span-2 p-[clamp(16px,3vw,25px)] rounded-[20px] flex flex-col sm:flex-row gap-[clamp(16px,5vw,50px)] items-stretch">
              <div className="flex-1 flex flex-col gap-[clamp(20px,2vw,40px)] order-2 sm:order-1">
                <h3 className="text-center sm:text-left text-[clamp(14px,1.5vw,18px)] font-semibold text-[#234BA0]">
                  {musicCards[2].title}
                </h3>
                <p className="text-[14px] sm:text-[16px] text-[#333]">
                  {musicCards[2].text}
                </p>
              </div>

              <div className="flex-1 relative w-full min-h-[170px] sm:min-h-0 sm:h-full rounded-[clamp(10px,1.5vw,25px)] overflow-hidden order-1 sm:order-2">
                <Image
                  src={musicCards[2].image}
                  alt={musicCards[2].title}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 mx-[15px]">
            <div className="flex flex-col text-center max-w-[860px] mx-auto sm:mb-[40px]">
              <h2 className="text-[clamp(18px,4vw,30px)] font-semibold leading-tight mb-[clamp(20px,4vw,70px)]">
                {danceTitle}
              </h2>
              <p className="text-[clamp(14px,1.2vw,16px)] text-[#333] mb-[clamp(20px,4vw,40px)]">
                {danceIntro}
              </p>
              <p className="text-[#333] text-[14px]">{danceLead}</p>
            </div>

            <div className={st.cardWrapper}>
              <div className="flex-1 flex w-full">
                <div className="relative w-full min-h-[170px] lg:h-full rounded-[12px] overflow-hidden">
                  <Image
                    src="/images/culture/dance.webp"
                    alt="Молдавские танцы"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <ul className="flex-1 h-full text-[clamp(14px,1.2vw,16px)] list-disc pl-[40px] sm:pl-[50px] text-[#333] bg-white p-[25px] rounded-[12px] gap-3 flex flex-col">
                {danceList.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <p className="text-center max-w-[860px] mx-auto text-[clamp(14px,1.2vw,16px)] ">
              {danceConclusion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
