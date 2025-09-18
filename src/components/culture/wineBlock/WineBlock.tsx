import { useWineContent } from "@/components/hooks/useWineContent";
import Image from "next/image";

function WineTypeCard({
  title,
  image,
  color,
  list,
}: {
  title: string;
  image: string;
  color: string;
  list: { name: string; text: string }[];
}) {
  return (
    <div className="bg-white p-[clamp(16px,2vw,25px)] rounded-[10px] md:rounded-[25px] flex flex-col gap-[clamp(15px,2vw,20px)] items-center text-center">
      <p className={`${color} font-semibold text-[clamp(14px,1.2vw,16px)]`}>
        {title}
      </p>
      <div className="relative w-full sm:max-w-[220px] aspect-[3/4] rounded-[12px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 640px) 220px, 100vw"
          className="object-cover"
        />
      </div>
      <ul className="text-[14px] sm:text-[16px] text-[#333] list-none text-center lg:text-left flex flex-col">
        {list.map((item, idx) => (
          <li key={idx} className="leading-[18px]">
            {item.name && <strong>{item.name}</strong>}
            {item.name && " "}
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WineBlock() {
  const { intro, legendaryWineriesTitle, wineries, mainVarietiesTitle, types } =
    useWineContent();
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="max-w-[1020px] mx-auto">
        <div className="flex flex-col gap-[clamp(30px,4vw,60px)] mx-[15px]">
          <div className="flex flex-col gap-4 text-center text-[14px] sm:text-[16px] text-[#333] max-w-[890px] mx-auto">
            {intro.map((p, i) => (
              <p key={i}>
                {p.split(" ").map((word, wi) => (
                  <span key={wi}>{word} </span>
                ))}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-[40px]">
            <h2 className="text-center text-[clamp(18px,4vw,30px)] font-semibold">
              {legendaryWineriesTitle}
            </h2>
            <div className="flex flex-col md:flex-row gap-[clamp(15px,3vw,40px)] items-stretch">
              <div className="relative w-full md:max-w-[290px] h-[200px] sm:h-[300px] md:h-auto rounded-[10px] md:rounded-[25px] overflow-hidden flex-shrink-0">
                <Image
                  src="/images/culture/wine-cellar.webp"
                  alt="Moldavian wines"
                  fill
                  sizes="(min-width: 768px) 290px, 100vw"
                  className="object-cover"
                />
              </div>

              <ul className="flex flex-col gap-[clamp(16px,2vw,30px)] text-[14px] sm:text-[16px] text-[#333] list-disc space-y-2 bg-white p-[15px] md:p-[25px] rounded-[10px] md:rounded-[25px] pl-[40px] md:pl-[40px] h-full">
                {wineries.map((item, idx) => (
                  <li key={idx}>
                    {item.name && <strong>{item.name}</strong>}
                    {item.name && " "}
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-[clamp(25px,3vw,40px)]">
            <h2 className="text-center text-[clamp(18px,4vw,30px)] font-semibold">
              {mainVarietiesTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(20px,3vw,35px)]">
              <WineTypeCard
                title={types.white.title}
                image="/images/culture/white-wine.webp"
                color="text-[#234BA0]"
                list={types.white.list}
              />
              <WineTypeCard
                title={types.red.title}
                image="/images/culture/red-wine.webp"
                color="text-[#A8163D]"
                list={types.red.list}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
