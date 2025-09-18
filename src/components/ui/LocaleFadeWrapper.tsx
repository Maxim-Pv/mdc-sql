"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

export function LocaleFadeWrapper({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const [currentLocale, setCurrentLocale] = useState(locale);

  useEffect(() => {
    if (locale !== currentLocale) setCurrentLocale(locale);
  }, [locale]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentLocale}
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
