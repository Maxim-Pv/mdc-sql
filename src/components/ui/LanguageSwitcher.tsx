"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

const LOCALES = ["ru", "md"] as const;
type Locale = (typeof LOCALES)[number];

function getCurrentLocale(pathname: string): Locale {
  const seg = pathname.split("/").filter(Boolean)[0];
  if (seg === "md" || seg === "ru") return seg;
  return "ru";
}

function buildLocalizedPath({ pathname, searchParams, targetLocale }: { pathname: string; searchParams: URLSearchParams; targetLocale: Locale }) {
  const segments = pathname.split("/").filter(Boolean);
  const hasLocale = segments[0] === "ru" || segments[0] === "md";
  const rest = hasLocale ? segments.slice(1) : segments;
  const base = rest.length ? `/${rest.join("/")}` : "";
  const path = `/${targetLocale}${base}`;
  const qs = searchParams.toString();
  return qs ? `${path}?${qs}` : path;
}

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLocale = getCurrentLocale(pathname || "/");

  const switchTo = (loc: Locale) => {
    if (loc === currentLocale) return;
    const newPath = buildLocalizedPath({
      pathname: pathname || "/",
      searchParams: new URLSearchParams(searchParams?.toString() || ""),
      targetLocale: loc,
    });
    router.push(newPath);
  };

  return (
    <div className="flex gap-2 items-center">
      {LOCALES.map((loc) => (
        <button
          key={loc}
          onClick={() => switchTo(loc)}
          aria-current={loc === currentLocale ? "page" : undefined}
          className={clsx(
            "text-[10px] px-[4px] py-[2px] lg:px-3 lg:py-1 rounded-md lg:text-sm font-medium transition cursor-pointer",
            loc === currentLocale ? "bg-white text-black" : "text-white/80 hover:text-white bg-black/30"
          )}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
