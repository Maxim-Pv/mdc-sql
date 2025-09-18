import { getCardsInfo } from "@/constant/cardsInfo";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CardDescriptionBlock() {
  const t = useTranslations("main.cardDescription");
  const cardsInfo = getCardsInfo(t);

  return (
    <section className="pt-[40px] pb-[30px] px-[18px] bg-[#234BA0] rounded-[24px] xl:py-[30px] xl:px-[40px]">
      <div className="max-w-[1200px] mx-auto text-white text-center">
        <h2 className="pb-[30px] text-[26px] max-w-[700px] mx-auto xl:text-[44px] font-medium xl:mb-[50px] uppercase">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[17px] sm:gap-[15px] text-black mb-[17px] sm:mb-12">
          {cardsInfo.map(({ title, text, imgSrc }, index) => (
            <div
              key={index}
              className="flex flex-col justify-between bg-white rounded-[22px] overflow-hidden shadow-md"
            >
              <div className="p-[20px] sm:p-[10px] lg:p-[30px] bg-[#E9E9E9] sm:bg-white min-h-[285px]">
                <h3 className="text-[24px] lg:text-[32px] font-medium uppercase mb-[14px] text-center">
                  {title}
                </h3>
                <p className="whitespace-pre-line text-start text-[12px] sm:text-[14px] leading-[16px] font-medium tracking-wider">
                  {text}
                </p>
              </div>
              <Image
                src={imgSrc}
                alt={title}
                width={400}
                height={260}
                className="hidden sm:block w-full h-[200px] object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mx-auto w-full h-auto rounded-[16px] overflow-hidden shadow-lg">
          <div className="relative w-full pt-[56.25%]">
            <iframe
              src="https://vk.com/video_ext.php?oid=-227416763&id=456239017&hash=2f0e54aeae4377a3"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
