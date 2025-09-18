import { useCuisineContent } from "@/components/hooks/useCuisineContent";
import Image from "next/image";

export default function CuisineBlock() {
  const { intro, dishes } = useCuisineContent();
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full max-w-[1020px] mx-auto">
        <div className="flex flex-col gap-[clamp(30px,4vw,60px)] mx-[15px]">
          <p className="text-center text-[14px] sm:text-[16px] text-[#333] max-w-[750px] mx-auto">
            {intro}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(16px,3vw,35px)]">
            {dishes.map((dish, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:items-center sm:flex-row bg-white rounded-[20px] p-[clamp(16px,2vw,25px)] gap-[clamp(16px,2vw,20px)] items-start"
              >
                <div className="relative w-full max-h-[200px] sm:max-h-[230px] lg:max-h-full sm:w-[160px] lg:w-[190px] aspect-[4/3] sm:aspect-[3/4] rounded-[16px] overflow-hidden shrink-0">
                  <Image
                    src={dish.image}
                    alt={dish.title}
                    fill
                    sizes="(min-width: 640px) 160px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="text-[14px] sm:text-[16px] sm:leading-[1.3] text-[#333]">
                  <strong className="text-[#234BA0]">{dish.title}</strong>{" "}
                  {dish.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
