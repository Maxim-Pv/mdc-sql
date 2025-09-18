"use client";

import HeaderNav from "@/components/headerNav/HeaderNav";
import { useState } from "react";
import st from "./styles.module.css";
import PolicyText from "@/constant/policyText";

export default function PolicyPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <HeaderNav
        hasBackground={true}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <main className={st.policyPage}>
        <div className={st.container}>
          <div className={st.header}>
            <h1 className="text-[20px] sm:text-[30px] lg-text-[42px] xl:text-[50px]  font-bold text-center uppercase">
              Политика конфиденциальности
            </h1>
          </div>
          <div className="mt-[20px] bg-white px-[10px] py-[20px] sm:py-[30px] md:py-[40px] xl:py-[50px] lg rounded-[10px] sm:px-[20px] md:px-[30px] xl:px-[70px]">
            <PolicyText />
          </div>
        </div>
      </main>
    </>
  );
}
