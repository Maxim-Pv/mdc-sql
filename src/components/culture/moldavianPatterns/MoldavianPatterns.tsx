import { useMoldavianPatterns } from "@/components/hooks/useMoldovianPatterns";
import Image from "next/image";

interface CostumeCardProps {
  label: string;
  image?: string;
  color?: string;
  alt: string;
  text: string;
}

const CostumeCard = ({ label, image, color, alt, text }: CostumeCardProps) => (
  <div className="bg-white rounded-[20px] p-[clamp(16px,2vw,25px)] text-center flex flex-col gap-[clamp(16px,2vw,25px)] items-center">
    <p
      className="font-semibold text-[clamp(14px,1.2vw,16px)]"
      style={{ color }}
    >
      {label}
    </p>
    {image && (
      <div className="relative w-full max-h-[510px] aspect-[3/4] rounded-[10px] sm:rounded-[25px] overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
    )}
    <p className="text-[14px] sm:text-[16px] text-[#333] text-left">{text}</p>
  </div>
);
export default function MoldavianPatterns() {
  const { intro, carpet, costume, costumes } = useMoldavianPatterns();

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="max-w-[1020px] mx-auto">
        <div className="w-full px-[15px] gap-[clamp(30px,5vw,70px)] flex flex-col">
          <p className="text-center max-w-[890px] mx-auto text-[14px] sm:text-[16px] text-[#333]">
            {intro}
          </p>

          <div className="flex flex-col gap-[clamp(25px,3vw,40px)]">
            <h2 className="text-center font-semibold text-[clamp(18px,4vw,30px)] xl:pb-[30px]">
              {carpet.title}
            </h2>

            <p className="text-center max-w-[890px] mx-auto text-[14px] sm:text-[16px] text-[#333]">
              {carpet.paragraph1}
            </p>

            <div className="flex flex-col sm:flex-row gap-[clamp(20px,3vw,30px)] align-stretch">
              <ul className="order-2 sm:order-0 bg-white p-[15px] md:p-[25px] rounded-[10px] md:rounded-[25px] flex-1 flex flex-col gap-[clamp(16px,2vw,30px)] text-[14px] sm:text-[16px] text-[#333] list-disc pl-[40px] md:pl-[40px]">
                {carpet.list.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <div className="flex-1 flex w-full order-1 sm:order-0">
                <div className="relative w-full min-h-[170px] lg:h-full rounded-[10px] md:rounded-[25px] overflow-hidden">
                  <Image
                    src="/images/culture/carpet.webp"
                    alt="Молдавский ковер"
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[clamp(16px,2vw,30px)] text-center max-w-[890px] mx-auto text-[14px] sm:text-[16px] text-[#333]">
              <p>{carpet.paragraph2}</p>
              <p>{carpet.paragraph3}</p>
            </div>
          </div>

          <div className="flex flex-col gap-[clamp(20px,3vw,40px)]">
            <h2 className="text-center font-semibold text-[clamp(18px,4vw,30px)]">
              {costume.title}
            </h2>

            <p className="text-center max-w-[890px] mx-auto text-[14px] sm:text-[16px] text-[#333]">
              {costume.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(20px,3vw,35px)]">
              {costumes.map((item, idx) => (
                <CostumeCard
                  key={idx}
                  label={item.label}
                  alt={item.alt}
                  text={item.text}
                  color={item.color}
                  image={item.image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
