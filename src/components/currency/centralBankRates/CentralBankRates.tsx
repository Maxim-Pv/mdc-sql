import { Skeleton } from "@/components/ui/Skeleton";
import { Rates } from "@/types/rates";
import { useTranslations } from "next-intl";
import Image from "next/image";
import st from "./styles.module.css";

export default function CentralBankRates({ data }: { data?: Rates }) {
  const t = useTranslations("currency.centralBankRates");
  const loading = !data;

  const date = data?.date || "";
  const prevDate = data?.prevDate || "";
  const rate = data?.rate;
  const previous = data?.previous;

  const isTodayNegative = rate?.diff != null && rate.diff < 0;
  const isPrevNegative = previous?.diff != null && previous.diff < 0;
  const todayClass = isTodayNegative ? "text-red-500" : "text-green-500";
  const prevClass = isPrevNegative ? "text-red-500" : "text-green-500";
  const todaySymbol = isTodayNegative ? "-" : "+";
  const prevSymbol = isPrevNegative ? "-" : "+";

  const blocks = [
    {
      title: t("code"),
      render: () => (
        <div className="flex items-center gap-[5px]">
          <div className="relative w-[20px] h-[20px] sm:w-[23px] sm:h-[23px]">
            <Image
              src="/icons/flag-mld.svg"
              alt="MDL"
              fill
              className="object-contain"
            />
          </div>
          {loading ? (
            <Skeleton className="w-[40px] lg:w-[55px] h-[18px] sm:h-6 rounded" />
          ) : (
            <span className="font-bold text-black text-[16px] sm:text-[22px]">
              {data.code}
            </span>
          )}
        </div>
      ),
    },
    {
      title: t("nominal"),
      render: () =>
        loading ? (
          <Skeleton className="w-full h-[14px] sm:h-6 rounded" />
        ) : (
          <div className="w-full flex items-center justify-center text-black text-[12px] sm:text-[16px] text-center">
            <span>{data.nominal}</span>
          </div>
        ),
    },
    {
      title: t("currency"),
      render: () =>
        loading ? (
          <Skeleton className="w-[80px] sm:w-[150px] h-[14px] sm:h-6 rounded" />
        ) : (
          <div className="font-semibold text-black text-[12px] sm:text-[16px]">
            {data.currencyName}
          </div>
        ),
    },
    {
      title: t("cbOn"),
      render: () => (
        <div className="flex gap-2 items-center">
          {loading ? (
            <Skeleton className="w-[110px] h-[20px] sm:h-6 rounded" />
          ) : (
            <div className="text-black font-bold text-[18px] sm:text-[20px] lg:text-[22px]">
              {rate && rate.value.toFixed(4)} ₽
            </div>
          )}
          {loading ? (
            <Skeleton className="w-[110px] h-[16px] sm:h-5 rounded" />
          ) : (
            <div
              className={`flex gap-2 justify-center text-[12px] sm:text-[16px] ${todayClass}`}
            >
              <span>
                {todaySymbol}
                {rate && Math.abs(rate.diff).toFixed(4)}
              </span>
              <span>
                {todaySymbol}
                {rate && Math.abs(rate.percent).toFixed(2)}%
              </span>
            </div>
          )}
        </div>
      ),
      dynamicLabel: loading ? (
        <Skeleton className="w-[85px] h-4 rounded" />
      ) : (
        date
      ),
    },
    {
      title: t("cbPrevious"),
      render: () => (
        <div className="flex gap-2 items-center">
          {loading ? (
            <Skeleton className="w-[110px] h-[20px] sm:h-6 rounded" />
          ) : (
            <div className="text-black font-bold text-[18px] sm:text-[20px] lg:text-[22px]">
              {previous && previous.value.toFixed(4)} ₽
            </div>
          )}
          {loading ? (
            <Skeleton className="w-[110px] h-[16px] sm:h-5  rounded" />
          ) : (
            <div
              className={`flex gap-2 justify-center text-[12px] sm:text-[16px] ${prevClass}`}
            >
              <span>
                {prevSymbol}
                {previous && Math.abs(previous.diff).toFixed(4)}
              </span>
              <span>
                {prevSymbol}
                {previous && Math.abs(previous.percent).toFixed(2)}%
              </span>
            </div>
          )}
        </div>
      ),
      dynamicLabel: loading ? (
        <Skeleton className="w-[85px] h-4 rounded" />
      ) : (
        prevDate
      ),
    },
  ];

  return (
    <div className={st.container}>
      <div className={st.row}>
        {blocks.slice(0, 3).map(({ title, render }, idx) => (
          <div key={idx} className={st.block}>
            <div className={st.title}>{title}</div>
            <div className={st.content}>{render()}</div>
          </div>
        ))}
      </div>

      <div className={st.row}>
        {blocks.slice(3).map(({ title, render, dynamicLabel }, idx) => (
          <div key={idx + 3} className={st.block}>
            <div className={`${st.title} flex gap-1`}>
              <span>{title}</span>
              <span>{dynamicLabel}</span>
            </div>
            <div className={st.content}>{render()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
