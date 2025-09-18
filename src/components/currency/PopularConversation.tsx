import { Rates } from "@/types/rates";
import { Skeleton } from "../ui/Skeleton";
import { useTranslations } from "next-intl";

const popularAmounts = [
  5, 10, 20, 50, 100, 150, 200, 300, 500, 600, 1500, 2000, 5000, 10000, 100000,
  1000000,
];

function formatRub(value: number) {
  return (
    new Intl.NumberFormat("ru-RU", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) + " RUB"
  );
}

type Props = {
  data?: Rates;
};
export default function PopularConversation({ data }: Props) {
  const t = useTranslations("currency.popular");
  const loading = !data;
  const ratePerUnit = data ? data.rate.value / data.nominal : 0;
  return (
    <div className="bg-white px-[20px] py-[30px] lg:p-[30px] rounded-[10px] sm:rounded-[20px] w-full">
      <h2 className="text-[22px] sm:text-[30px] font-medium mb-4">
        {t("title")}
      </h2>
      <div
        className={`
        grid grid-cols-2 md:grid-cols-4 gap-x-7 gap-y-[20px]
        overflow-y-auto
          max-h-[300px] sm:max-h-[380px] md:max-h-[400px] lg:max-h-none
          pb-4
          scroll-pb-4
        `}
      >
        {popularAmounts.map((amount, idx) => {
          const label = t("label", {
            amount: amount.toLocaleString("ru-RU"),
          });
          const value = loading ? null : formatRub(amount * ratePerUnit);
          return (
            <div key={idx} className="flex flex-col gap-2">
              <div className="text-[14px] leading-[30px]">{label}</div>
              {loading ? (
                <Skeleton className="w-[80px] h-5 rounded" />
              ) : (
                <div className="text-[16px] font-bold">{value}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
