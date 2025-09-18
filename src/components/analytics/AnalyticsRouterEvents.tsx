"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function AnalyticsRouterEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const key = pathname + "?" + searchParams.toString();

    if ((window as any).__mailruLastPV === key) return;
    (window as any).__mailruLastPV = key;

    const ids: string[] = (window as any).__mailruIds || [];
    if (!ids.length) return;
    (window as any)._tmr = (window as any)._tmr || [];
    const now = Date.now();
    ids.forEach((id) =>
      (window as any)._tmr.push({ id, type: "pageView", start: now })
    );
  }, [pathname, searchParams]);

  return null;
}
