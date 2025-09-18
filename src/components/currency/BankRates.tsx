"use client";

import Image from "next/image";
import { useBankRates } from "../hooks/useBankRates";
import { BankInfo } from "@/types/banks";
import { Skeleton } from "../ui/Skeleton";
import { useLocale, useTranslations } from "next-intl";

export default function BankRates() {
  const t = useTranslations("currency.bankRates");
  const locale = useLocale();
  const bestRates = useBankRates();
  const loading = bestRates === null;

  const displayRates: BankInfo[] = loading
    ? [
        { bankName: "ИС Банк", buy: 0, sale: 0 },
        { bankName: "Трансстройбанк", buy: 0, sale: 0 },
      ]
    : bestRates!;

  const formattedNow = new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "md-MD", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());

  return (
    <div className="bg-white px-[20px] py-[30px] lg:px-[25px] rounded-[10px] sm:rounded-[20px] w-full flex flex-col gap-[20px] lg:gap-[42px] lg:max-w-[315px]">
      <h2 className="text-[22px] font-medium">{t("title")}</h2>

      <div className="flex flex-col sm:flex-row lg:flex-col sm:justify-between gap-[20px] lg:mb-[30px] flex-1 sm:whitespace-wrap">
        {displayRates.map((bank, idx) => (
          <div key={bank.bankName} className="flex gap-10 sm:gap-4 items-center">
            <Image
              src={`/banks/${bank.bankName.toLowerCase().replace(/\s+/g, "")}.png`}
              alt={bank.bankName}
              width={80}
              height={80}
              className={`w-[80px] h-[80px] object-cover rounded-[10px] border ${idx === 1 ? "border-[#C19D54]" : ""} shrink-0`}
            />

            <div className="h-[80px] w-full flex flex-col justify-between">
              <div className="flex flex-col text-sm gap-1">
                {loading ? (
                  <Skeleton className="w-[100px] h-4 rounded" />
                ) : (
                  <span className="font-semibold text-[12px] sm:text-[16px]">{bank.bankName}</span>
                )}
                <span className="text-[#848484] text-[10px]">{t("bankRateLabel")}</span>
              </div>

              <div className="flex justify-between w-full sm:w-unset sm:gap-5 md:gap-10 lg:gap-0">
                <div className="text-left flex flex-col gap-1">
                  <span className="text-[12px]">{t("buy")}</span>
                  {loading || bank.buy === 0 ? (
                    <Skeleton className="w-[60px] h-4 rounded" />
                  ) : (
                    <span className="font-semibold text-[12px] sm:text-[16px] whitespace-nowrap">{bank.buy} MDL</span>
                  )}
                </div>

                <div className="text-left flex flex-col gap-1">
                  <span className="text-[12px]">{t("sell")}</span>
                  {loading || bank.sale === 0 ? (
                    <Skeleton className="w-[60px] h-4 rounded" />
                  ) : (
                    <span className="font-bold text-[12px] sm:text-[16px] whitespace-nowrap">{bank.sale} MDL</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-[12px] sm:text-[16px] flex gap-2">
        <span>{t("updated")}</span>
        {loading ? <Skeleton className="w-[150px] lg:w-full h-4 rounded" /> : <span>{formattedNow}</span>}
      </div>
    </div>
  );
}
