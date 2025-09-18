"use client";

import HeaderNav from "@/components/headerNav/HeaderNav";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense, useState } from "react";

export default function NotFound() {
  const [menuOpen, setMenuOpen] = useState(false);
  const params = useParams() as { locale?: string };
  const homeHref = `/${params?.locale ?? ""}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F7]">
      <Suspense fallback={null}>
        <HeaderNav
          hasBackground
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      </Suspense>

      <main
        role="main"
        className="flex-1 container mx-auto px-3 sm:px-6 pt-[110px] sm:pt-[130px] lg:pt-[160px]"
      >
        <section className="mx-auto w-full max-w-[920px]">
          <div className="bg-white rounded-[24px] sm:rounded-[30px] shadow-sm p-4 sm:p-7 md:p-10 flex flex-col items-center text-center gap-4 sm:gap-6">
            <Image
              src="/images/404.webp"
              alt="404"
              width={960}
              height={560}
              priority
              className="w-full h-auto max-w-[640px]"
              sizes="(max-width: 640px) 100vw, 640px"
            />

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#222]">
              Страница не найдена
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[#6B6B6B] max-w-[680px]">
              Неправильно набран адрес или такой страницы не существует.
            </p>

            <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                href={homeHref}
                className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-3 rounded-[12px] sm:rounded-[15px] font-medium bg-yellow-400 hover:bg-yellow-300 transition-colors"
              >
                Перейти на главную
              </Link>

              <button
                type="button"
                onClick={() => history.back()}
                className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-3 rounded-[12px] sm:rounded-[15px] font-medium border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Назад
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
