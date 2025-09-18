import { useDiasporaContent } from "@/components/hooks/useDiasporaContent";
import Image from "next/image";

export default function CultureDiasporaBlock() {
  const {
    intro,
    sectionTitle,
    cards,
    unesco: {
      title: unescoTitle,
      description: unescoDescription,
      material,
      intangible,
    },
  } = useDiasporaContent();
  return (
    <div className="w-full flex flex-col justify-center px-4">
      <div className="flex flex-col gap-[40px] sm:gap-[70px] max-w-[1020px] mx-auto">
        <div className="text-center sm:px-3 text-[14px] sm:text-[16px] text-[#333] max-w-[850px] mx-auto">
          <p>{intro}</p>
        </div>

        {/* Диаспоры */}
        <div className="flex flex-col gap-[40px]">
          <h2 className="text-center text-[clamp(18px,4vw,30px)] font-semibold">
            {sectionTitle}
          </h2>
          <div className="relative bg-[#f6f6f6] p-[15px] sm:p-[30px] rounded-[10px] md:rounded-[25px] overflow-hidden">
            {/* Фоновое изображение */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/main/rug-bg.webp"
                alt="Carpet background"
                fill
                sizes="(min-width: 1020px) 1020px, calc(100vw - 2rem)"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="relative z-10 flex flex-col gap-[clamp(12px,2vw,25px)]">
              <div className="lg:min-h-[110px] flex items-center bg-white p-[clamp(15px,2vw,20px)] rounded-[10px] md:rounded-[25px] text-[14px] sm:text-[16px] text-[#333]">
                {cards[0]}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(12px,2vw,25px)] lg:min-h-[170px]">
                {cards.slice(1).map((text, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-white p-[clamp(15px,2vw,20px)] rounded-[10px] md:rounded-[25px] text-[14px] sm:text-[16px] text-[#333]"
                  >
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[clamp(25px,3vw,40px)]">
          <h2 className="text-center text-[clamp(18px,4vw,30px)] font-semibold mb-[15px]">
            {unescoTitle}
          </h2>
          <p className="text-center text-[14px] sm:text-[16px] text-[#333] max-w-[800px] mx-auto">
            {unescoDescription}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-[clamp(25px,2vw,30px)]">
            <div className="flex flex-col gap-[20px]">
              <p className="text-[#234BA0] font-semibold text-center text-[14px] sm:text-[16px]">
                {material.title}
              </p>
              <div className="flex items-center bg-white p-[clamp(16px,2vw,25px)] rounded-[16px] text-[14px] sm:text-[16px] lg:leading-[1.3] text-[#333] flex-1">
                {material.paragraph}
              </div>
            </div>
            <div className="flex flex-col gap-[20px]">
              <p className="text-[#234BA0] font-semibold text-center text-[14px] sm:text-[16px]">
                {intangible.title}
              </p>
              <div className="flex items-center bg-white p-[clamp(16px,2vw,25px)] rounded-[16px] text-[14px] sm:text-[16px] text-[#333] flex-1">
                <ul className="list-disc pl-4">
                  {intangible.list.map((item, idx) => (
                    <li className="lg:leading-[1.3]" key={idx}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
