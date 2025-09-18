import Image from "next/image";

interface PatternTitleProps {
  title: React.ReactNode;
}

export default function PatternTitle({ title }: PatternTitleProps) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full flex items-center justify-between xl:gap-[30px] overflow-hidden">
        <div className="flex-1 flex justify-start xl:justify-center overflow-hidden h-[40px] lg:h-[60px] xl:h-[100%]">
          <div className="relative w-full h-full xl:h-[70px] sm:aspect-[6/1]">
            <Image
              src="/icons/pattern.svg"
              alt="pattern left"
              fill
              className="object-right object-cover xl:object-contain"
            />
          </div>
        </div>

        <div
          className={`w-[68%] md:w-[60%] lg:w-[50%] xl:w-[37%] text-center shrink-0`}
        >
          <h2 className="font-semibold text-black text-[clamp(16px,5vw,30px)] leading-tight uppercase">
            {title}
          </h2>
        </div>

        <div className="flex flex-1 justify-end xl:justify-center  overflow-hidden h-[40px] lg:h-[60px] xl:h-[100%]">
          <div className="relative w-full h-full xl:h-[70px] sm:aspect-[6/1]">
            <Image
              src="/icons/pattern.svg"
              alt="pattern right"
              fill
              className="object-left object-cover xl:object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
