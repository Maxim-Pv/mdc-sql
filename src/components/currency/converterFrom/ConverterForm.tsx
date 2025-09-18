"use client";

import { Rates } from "@/types/rates";
import { useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import st from "./styles.module.css";
import { Skeleton } from "@/components/ui/Skeleton";
import { useTranslations } from "next-intl";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

type Props = {
  data?: Rates;
};

export default function ConverterForm({ data }: Props) {
  const t = useTranslations("currency.converter");
  const loading = !data;
  const inputStarted = useRef(false);
  const [rub, setRub] = useState<string>("");
  const [mdl, setMdl] = useState<string>("");
  const [direction, setDirection] = useState<"RUB_TO_MDL" | "MDL_TO_RUB">(
    "RUB_TO_MDL"
  );

  const rateValue = data?.rate.value ?? 0;
  const inverseRub = rateValue > 0 ? 10 / rateValue : 0;
  const inverseMdl = rateValue > 0 ? rateValue / 10 : 0;

  const rubToMdl = (value: number) => value * inverseRub;
  const mdlToRub = (value: number) => value * inverseMdl;

  const handleInputChange = (value: string) => {
    if (!inputStarted.current) {
      inputStarted.current = true;
      direction === "RUB_TO_MDL" ? setMdl("") : setRub("");
    }
    direction === "RUB_TO_MDL" ? setRub(value) : setMdl(value);
  };

  const handleConvert = () => {
    if (direction === "RUB_TO_MDL") {
      const result = rub ? formatNumber(rubToMdl(Number(rub))) : "";
      setMdl(result);
    } else {
      const result = mdl ? formatNumber(mdlToRub(Number(mdl))) : "";
      setRub(result);
    }

    inputStarted.current = false;
  };

  const toggleDirection = () => {
    setRub("");
    setMdl("");
    inputStarted.current = false;
    setDirection((prev) =>
      prev === "RUB_TO_MDL" ? "MDL_TO_RUB" : "RUB_TO_MDL"
    );
  };

  return (
    <div className="bg-white px-[20px] py-[30px] lg:px-[30px] rounded-[10px] sm:rounded-[20px] w-full flex flex-col gap-[10px] sm:gap-[30px] lg:min-h-[480px]">
      <h2 className="text-[22px] sm:text-[30px] font-medium text-[#234BA0]">
        {t("title")}
      </h2>

      <div className="flex flex-col gap-[8px]">
        <label className="text-[12px] sm:text-[16px] flex flex-col gap-[10px]">
          {t("iHave")}
          <div
            className="h-[80px] flex items-center justify-between bg-[#ECECEC] rounded-[10px] px-[19px] py-[13px] font-medium mb-5"
            style={{ boxShadow: "inset 0px 2px 8.6px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="flex flex-col w-full">
              {loading ? (
                <Skeleton className="w-full h-[40px] rounded" />
              ) : (
                <div className="flex items-center">
                  <NumericFormat
                    value={direction === "RUB_TO_MDL" ? rub : mdl}
                    onValueChange={({ value }) => handleInputChange(value)}
                    thousandSeparator=" "
                    decimalSeparator=","
                    suffix={direction === "RUB_TO_MDL" ? " р" : " леи"}
                    allowNegative={false}
                    className="bg-transparent outline-none w-full text-[30px]"
                  />
                </div>
              )}
              {loading ? (
                <Skeleton className="w-[120px] h-4 mt-2 rounded" />
              ) : (
                <div className="text-[12px] text-gray-400">
                  1 {direction === "RUB_TO_MDL" ? "RUB" : "MDL"} ={" "}
                  {direction === "RUB_TO_MDL"
                    ? inverseRub.toFixed(4)
                    : inverseMdl.toFixed(4)}{" "}
                  {direction === "RUB_TO_MDL" ? "MDL" : "RUB"}
                </div>
              )}
            </div>
            <img
              src={
                direction === "RUB_TO_MDL"
                  ? "/icons/flag-rus.svg"
                  : "/icons/flag-mld.svg"
              }
              alt="from"
              className="w-[23px] h-[23px]"
            />
          </div>
        </label>

        {/* Переключатель */}
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={toggleDirection}
        >
          <img src="/icons/exchange.svg" alt="exchange" />
        </div>

        <label className="text-[12px] sm:text-[16px] flex flex-col gap-[10px]">
          {t("iWant")}
          <div
            className="h-[80px] flex items-center justify-between bg-[#ECECEC] rounded-[10px] px-[19px] py-[13px] font-medium"
            style={{ boxShadow: "inset 0px 2px 8.6px rgba(0, 0, 0, 0.25)" }}
          >
            {loading ? (
              <Skeleton className="w-full h-[40px] rounded" />
            ) : (
              <div>
                <input
                  type="text"
                  value={
                    direction === "RUB_TO_MDL"
                      ? mdl
                        ? `${mdl.replace(".", ",")} леи`
                        : ""
                      : rub
                      ? `${rub.replace(".", ",")} р`
                      : ""
                  }
                  readOnly
                  placeholder=""
                  className="bg-transparent outline-none w-full text-[30px]"
                />
                <div className="text-[12px] text-gray-400">
                  1 {direction === "RUB_TO_MDL" ? "MDL" : "RUB"} ={" "}
                  {direction === "RUB_TO_MDL"
                    ? inverseMdl.toFixed(4)
                    : inverseRub.toFixed(4)}{" "}
                  {direction === "RUB_TO_MDL" ? "RUB" : "MDL"}
                </div>
              </div>
            )}

            <img
              src={
                direction === "RUB_TO_MDL"
                  ? "/icons/flag-mld.svg"
                  : "/icons/flag-rus.svg"
              }
              alt="to"
              className="w-6 h-6 ml-2"
            />
          </div>
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-[15px] justify-between items-center mt-[18px] w-full">
        <button className={st.convertButton} onClick={handleConvert}>
          {t("convert")}
        </button>
        <div className="text-[12px] sm:text-[16px] flex flex-col gap-[10px] sm:gap-0 w-full sm:w-auto">
          {loading ? (
            <Skeleton className="w-[200px] h-4 rounded" />
          ) : (
            <>
              <p>{t("rateLine.rub", { value: inverseRub.toFixed(4) })}</p>
              <p>{t("rateLine.mdl", { value: inverseMdl.toFixed(4) })}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
