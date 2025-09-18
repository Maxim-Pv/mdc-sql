"use client";
import dynamic from "next/dynamic";

const YandexMapDynamic = dynamic(() => import("./YandexMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[270px] sm:h-[450px] lg:h-[500px] bg-gray-100 animate-pulse rounded-[12px]" />
  ),
});

export default YandexMapDynamic;
