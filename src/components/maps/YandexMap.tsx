"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Spinner from "../ui/spinner/Spinner";

interface YandexMapProps {
  coords: [number, number];
  name: string;
  className?: string;
}
export default function YandexMap({ coords, name, className }: YandexMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const placemarkInstance = useRef<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ymapsGlobal = (window as any).ymaps;

    // создаём или обновляем карту
    const initOrUpdateMap = () => {
      if (!mapContainerRef.current || !(window as any).ymaps) return;
      const ymaps = (window as any).ymaps;

      // Если карта уже создана — просто обновляем центр и балун
      if (mapInstance.current) {
        mapInstance.current.setCenter(coords);
        placemarkInstance.current.geometry.setCoordinates(coords);
        placemarkInstance.current.properties.set({
          hintContent: name,
          balloonContent: name,
        });
        return;
      }

      // Иначе создаём новую
      mapInstance.current = new ymaps.Map(mapContainerRef.current, {
        center: coords,
        zoom: 16,
        controls: ["zoomControl"],
      });

      placemarkInstance.current = new ymaps.Placemark(
        coords,
        {
          hintContent: name,
          balloonContent: name,
        },
        {
          preset: "islands#redDotIcon",
        }
      );

      mapInstance.current.geoObjects.add(placemarkInstance.current);
      setLoading(false);
    };

    // динамически грузим скрипт
    const loadScript = () => {
      if (document.getElementById("ymaps-script")) return;
      const script = document.createElement("script");
      script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_API_KEY}`;
      script.id = "ymaps-script";
      script.async = true;
      script.onload = () => {
        (window as any).ymaps.ready(initOrUpdateMap);
      };
      document.head.appendChild(script);
    };

    // Логика инициализации/обновления
    if (ymapsGlobal) {
      if (ymapsGlobal.Map) {
        initOrUpdateMap(); // Если уже готово — не ждём
      } else {
        ymapsGlobal.ready(initOrUpdateMap); // иначе ждём
      }
    } else {
      loadScript();
    }

    //  при размонтировании уничтожаем карту
    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, [coords, name]);

  return (
    <div className={clsx("relative w-full rounded-md", className)}>
      {loading && (
        <div className="flex items-center justify-center w-full h-full">
          <Spinner size={40} color="#FDB51B" />
        </div>
      )}
      <div
        ref={mapContainerRef}
        className="w-full h-full rounded-md"
        style={{ visibility: loading ? "hidden" : "visible" }}
      />
    </div>
  );
}
