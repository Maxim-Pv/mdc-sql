"use client";

import clsx from "clsx";
import Image from "next/image";
import DrawerMenu from "../drawer/DrawerMenu";
import BurgerButton from "../ui/BurgerButton";
import st from "./styles.module.css";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { useTranslations } from "next-intl";
import Link from "next/link";

const rawNavLinks = [
  { href: "/", labelKey: "nav.map" },
  // { href: "/merch", labelKey: "nav.merch" },
  { href: "/news", labelKey: "nav.news" },
  { href: "/currency", labelKey: "nav.currency" },
  { href: "/embassy", labelKey: "nav.embassy" },
  { href: "/culture", labelKey: "nav.culture" },
  { href: "/#contacts", labelKey: "nav.contacts" },
];

function buildLocalizedHref(href: string, locale: string) {
  if (href.startsWith("/#")) {
    return `/${locale}${href}`;
  }
  if (href === "/") {
    return `/${locale}`;
  }
  return `/${locale}${href}`;
}
export default function HeaderNav({
  hasBackground = false,
  menuOpen,
  setMenuOpen,
}: {
  hasBackground?: boolean;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const t = useTranslations();

  const segments = pathname?.split("/").filter(Boolean) || [];
  const currentLocale = segments[0] === "ru" || segments[0] === "md" ? segments[0] : "ru";

  const pathWithoutLocale = pathname?.replace(/^\/(ru|md)/, "") || "/";

  return (
    <>
      {pathWithoutLocale === "/" && (
        <div className={st.heroBackground}>
          <Image src="/images/main/hero-bg.jpg" alt="Фон с вышивкой" fill sizes="(max-width: 1440px) 0px, 100vw" priority className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className={st.phoneContainer}>
            <img src="/images/main/phone-mobile.png" alt="Phone" />
          </div>
        </div>
      )}

      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-30 transition-colors duration-300 rounded-b-[10px] overflow-x-clip",
          hasBackground
            ? "bg-[linear-gradient(360deg,rgba(0,0,0,0)_0%,#000_100%),url('/images/main/hero-bg.jpg')] bg-cover bg-center shadow-md"
            : "bg-[linear-gradient(360deg,rgba(0,0,0,0)_0%,#000_100%)]"
        )}
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="flex h-[95px] lg:h-[130px] items-center justify-between px-[18px] sm:px-[40px] relative">
            <Link
              href={buildLocalizedHref("/", currentLocale)}
              replace
              aria-label={t("logo.main")}
              className="flex items-center gap-[12px] cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <Image
                src="/icons/logo/logo-moldova.svg"
                alt="Логотип Молдовы"
                width={36}
                height={36}
                className="w-[48px] h-[48px] sm:w-[70px] sm:h-[70px]"
              />
              <div className="text-white text-sm sm:text-base leading-tight">
                <span className="text-[6px] sm:text-[10px] lg:text-[12px] leading-[10px] sm:leading-[14px] tracking-widest">{t("logo.prefix")}</span>
                <div className="text-[6px] sm:text-[10px] lg:text-[12px] leading-[10px] sm:leading-[14px] tracking-widest">{t("logo.line2")}</div>
                <div className=" font-bold text-[12px] lg:text-[16px] uppercase tracking-widest mt-[6px]">{t("logo.main")}</div>
              </div>
            </Link>

            <div className="block [@media(min-width:1200px)]:hidden ">
              <BurgerButton open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
            </div>
            <nav className="text-white hidden [@media(min-width:1200px)]:flex gap-6 px-8">
              {rawNavLinks.map(({ href, labelKey }) => {
                const localizedHref = buildLocalizedHref(href, currentLocale);
                const isActive =
                  href === "/#contacts"
                    ? pathWithoutLocale.startsWith("/#") // якорь на корне
                    : pathWithoutLocale === href || (href !== "/" && pathWithoutLocale.startsWith(href));

                return (
                  <Link
                    key={href + labelKey}
                    href={localizedHref}
                    className={clsx("opacity-70 hover:opacity-100 transition-opacity duration-300", isActive && "opacity-100 font-semibold")}
                  >
                    {t(labelKey)}
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-[10px] right-[20px] sm:right-[30px] ">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
        <DrawerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </header>
    </>
  );
}
