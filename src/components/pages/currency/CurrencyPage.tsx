"use client";

import BankRates from "@/components/currency/BankRates";
import CentralBankRates from "@/components/currency/centralBankRates/CentralBankRates";
import ConverterForm from "@/components/currency/converterFrom/ConverterForm";
import PopularConversation from "@/components/currency/PopularConversation";
import HeaderNav from "@/components/headerNav/HeaderNav";
import { useExchangeRate } from "@/components/hooks/useExchangeRate";
import CurrencyMetaTags from "@/lib/metaTags/CurrencyMetaTags";
import { useState } from "react";
import st from "./styles.module.css";

export default function CurrencyPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data, isLoading, error } = useExchangeRate("MDL", 10);

  return (
    <>
      <CurrencyMetaTags />
      <HeaderNav hasBackground menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className={st.wrapper}>
        <div className="w-full px-[10px] sm:px-[20px] md:px-[35px] lg:max-w-[1170px] flex flex-col gap-6">
          <CentralBankRates data={data} />
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="lg:flex-[2]">
              <ConverterForm data={data} />
            </div>
            <BankRates />
          </div>
          <PopularConversation data={data} />
        </div>
      </main>
    </>
  );
}
