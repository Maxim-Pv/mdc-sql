import { getPromoItems, PromoData } from "@/constant/promo";
import autoplay from "@/lib/keenAutoplay";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Promo() {
  const t = useTranslations("main.promo");
  const promoItems: PromoData[] = getPromoItems(t);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 1, spacing: 16 },
      breakpoints: {
        "(min-width: 768px)": { slides: { perView: 1, spacing: 24 } },
        "(min-width: 1024px)": { slides: { perView: 1, spacing: 32 } },
      },
    },
    [autoplay]
  );

  const sideArrow =
    "hidden lg:flex absolute top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-[#234BA0]/40 backdrop-blur items-center justify-center hover:bg-[#234BA0]/70 transition-opacity duration-200 opacity-0 group-hover:opacity-100 cursor-pointer";

  const mobileArrow =
    "lg:hidden h-10 w-10 rounded-full bg-[#234BA0]/40 backdrop-blur flex items-center justify-center hover:bg-[#234BA0]/70 transition-colors cursor-pointer";

  const iconProps = {
    className: "h-6 w-6",
    strokeWidth: 2,
    color: "white",
  } as const;

  return (
    <section className="w-full px-4 pb-[40px] sm:pb-[50px]">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-2xl lg:text-4xl font-medium mb-6 lg:mb-10">
          {t("heading")}
        </h2>

        <div className="relative group lg:px-[50px]">
          <div
            ref={sliderRef}
            className="keen-slider max-w-[1050px] lg:-w-full h-full sm:mx-auto sm:h-[740px] md:h-[700px] lg:h-[540px] overflow-hidden"
          >
            {promoItems.map((item, i) => (
              <div key={i} className="keen-slider__slide ">
                <PromoSlide {...item} />
              </div>
            ))}
          </div>

          {/* Стрелки по бокам (desktop) */}
          <button
            onClick={() => instanceRef.current?.prev()}
            className={`${sideArrow} left-0`}
            aria-label="Предыдущий слайд"
          >
            <IconChevronLeft {...iconProps} />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className={`${sideArrow} right-0`}
            aria-label="Следующий слайд"
          >
            <IconChevronRight {...iconProps} />
          </button>

          {/* Стрелки снизу для мобилки */}
          <div className="flex justify-center gap-4 lg:hidden absolute -bottom-12 left-1/2 -translate-x-1/2">
            <button
              onClick={() => instanceRef.current?.prev()}
              className={mobileArrow}
              aria-label="previous slide"
            >
              <IconChevronLeft {...iconProps} />
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              className={mobileArrow}
              aria-label="next slide"
            >
              <IconChevronRight {...iconProps} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PromoSlide({
  title,
  highlight,
  paragraphs,
  footnote,
  image,
  backgroundColor,
}: PromoData) {
  return (
    <div
      className="flex flex-col lg:flex-row h-full rounded-[10px] sm:rounded-[25px] overflow-hidden"
      style={{ backgroundColor }}
    >
      <div className="flex flex-col flex-1 text-left text-white w-full sm:basis-[53%] px-[10px] sm:px-[30px] pt-[10px] sm:pt-[30px] lg:pb-[30px]">
        <h3 className="text-[20px] lg:text-[32px] font-semibold uppercase mb-4 sm:mb-0 leading-[28px] lg:leading-[51px]">
          {highlight && (
            <span className="text-yellow-400 block leading-[28px] lg:leading-[51px]">
              {highlight}
            </span>
          )}
          {title}{" "}
        </h3>

        <div className="flex-1 py-[10px] text-xs sm:text-sm lg:text-[17px] lg:leading-[21px] whitespace-pre-line">
          {paragraphs.join("\n\n")}
        </div>

        {footnote && (
          <p className="text-sm opacity-50 whitespace-pre-line">{footnote}</p>
        )}
      </div>

      <div className="sm:basis-[47%] flex justify-end">
        <Image
          src={image}
          alt="promo image"
          width={600}
          height={450}
          className=" object-contain"
        />
      </div>
    </div>
  );
}
