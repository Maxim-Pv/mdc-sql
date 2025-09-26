'use client';
import dynamic from 'next/dynamic';

const YandexPvzMapDynamic = dynamic(() => import('./YMapPvz'), {
  ssr: false,
  loading: () => <div className="h-[220px] w-full animate-pulse rounded-md bg-gray-100 sm:h-[360px]" />,
});

export default YandexPvzMapDynamic;
