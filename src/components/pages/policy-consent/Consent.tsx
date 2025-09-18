"use client";

import { useState } from "react";

import st from "./styles.module.css";
import ConsentText from "@/constant/consentText";
import HeaderNav from "@/components/headerNav/HeaderNav";

export default function ConsentPage() {
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
          <div className="mt-[20px] bg-white px-[10px] py-[20px] sm:py-[30px] md:py-[40px] xl:py-[50px] lg rounded-[10px] sm:px-[20px] md:px-[30px] xl:px-[70px]">
            <ConsentText />
          </div>
        </div>
      </main>
    </>
  );
}
