'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { PvzCommon } from '@/types/delivery';
import Spinner from '../ui/spinner/Spinner';

type Props = {
  cityName?: string | null;
  offices: PvzCommon[]; // «сырые» ПВЗ из CDEK /deliverypoints
  onPick?: (pvz: PvzCommon) => void; // клик по маркеру (или по кнопке в баллуне)
  className?: string;
  height?: number;
  selectedPvzCode?: string | null;
};

const PRESET_DEFAULT = 'islands#darkGreenCircleIcon';
const PRESET_SELECTED = 'islands#darkGreenCircleDotIcon';
const CLUSTER_PRESET = 'islands#darkGreenClusterIcons';
export default function YandexPvzMap({ cityName, offices, onPick, className, height = 360, selectedPvzCode }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const clustererRef = useRef<any>(null);
  const placemarksRef = useRef<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  const [isReady, setIsReady] = useState(false);

  const initedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (initedRef.current) return; // ← защита от двойной инициализации
    initedRef.current = true;

    const ymapsGlobal = (window as any).ymaps;
    const ensureInit = () => {
      const ymaps = (window as any).ymaps;
      if (!ymaps || !mapContainerRef.current) return;

      ymaps.ready(() => {
        // карта
        mapRef.current = new ymaps.Map(
          mapContainerRef.current,
          {
            center: [55.751244, 37.618423],
            zoom: 11,
            controls: ['zoomControl'],
          },
          {
            suppressMapOpenBlock: true,
            yandexMapDisablePoiInteractivity: true,
          },
        );

        // кластеризатор
        clustererRef.current = new ymaps.Clusterer({
          preset: CLUSTER_PRESET,
          groupByCoordinates: false,
          clusterDisableClickZoom: false,
          clusterOpenBalloonOnClick: true,
        });
        mapRef.current.geoObjects.add(clustererRef.current);
        setLoading(false);
        setIsReady(true);

        // карта впервые стала видимой — подровняем вьюпорт
        setTimeout(() => mapRef.current?.container.fitToViewport(), 0);
      });
    };

    if (ymapsGlobal) {
      if (ymapsGlobal.Map) ensureInit();
      else ymapsGlobal.ready(ensureInit);
      return;
    }

    // динамическая загрузка
    if (!document.getElementById('ymaps-script')) {
      const script = document.createElement('script');
      script.id = 'ymaps-script';
      script.async = true;
      script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_API_KEY}`;
      script.onload = () => {
        (window as any).ymaps?.ready(ensureInit);
      };
      document.head.appendChild(script);
    } else {
      // если скрипт уже был добавлен, ждём готовности
      const ymaps = (window as any).ymaps;
      ymaps?.ready(ensureInit);
    }

    return () => {
      try {
        if (mapRef.current && clustererRef.current) {
          try {
            mapRef.current.geoObjects.remove(clustererRef.current);
          } catch {}
        }
        mapRef.current?.destroy?.();
      } catch {}
      mapRef.current = null;
      clustererRef.current = null;
      placemarksRef.current = {};
    };
  }, []);

  // --- helpers ---
  function renderOffices(ymaps: any, list: PvzCommon[]) {
    if (!mapRef.current) return;

    if (!clustererRef.current) {
      clustererRef.current = new ymaps.Clusterer({
        preset: CLUSTER_PRESET,
        groupByCoordinates: false,
        clusterDisableClickZoom: false,
        clusterOpenBalloonOnClick: true,
      });
    } else {
      try {
        mapRef.current.geoObjects.remove(clustererRef.current);
      } catch {}
    }
    mapRef.current.geoObjects.add(clustererRef.current);

    clustererRef.current.removeAll();
    placemarksRef.current = {};

    const points = (list || [])
      .filter((p) => p?.location?.latitude && p?.location?.longitude)
      .map((p) => {
        const lat = Number(p.location!.latitude);
        const lon = Number(p.location!.longitude);
        const coords = [lat, lon];
        const address = p.location?.address_full || p.location?.address || p.name || '';
        const html =
          `<div style="max-width:240px">` +
          `<div style="font-weight:600;margin-bottom:6px">${escapeHtml(address)}</div>` +
          (p.work_time ? `<div style="font-size:12px;color:#555">Время работы: ${escapeHtml(p.work_time)}</div>` : ``) +
          `<button type="button" id="pvz-${p.code}" style="margin-top:8px;padding:6px 10px;border-radius:6px;border:none;background:#ED1846;color:#fff;cursor:pointer">Выбрать ПВЗ</button>` +
          `</div>`;

        const placemark = new ymaps.Placemark(
          coords,
          { hintContent: address, balloonContent: html },
          { preset: PRESET_DEFAULT },
        );
        placemark.events.add('click', () => {
          // сброс всем
          Object.values(placemarksRef.current).forEach((pm: any) => pm.options.set('preset', PRESET_DEFAULT));
          // выделить текущую
          placemark.options.set('preset', PRESET_SELECTED);
        });

        placemark.events.add('balloonopen', () => {
          setTimeout(() => {
            const btn = document.getElementById(`pvz-${p.code}`);
            if (btn) {
              btn.onclick = (e: any) => {
                e?.preventDefault?.();
                // try {
                //   placemark.balloon.close();
                // } catch {}
                // try {
                //   mapRef.current?.balloon?.close?.();
                // } catch {}
                onPick?.(p);
              };
            }
          }, 0);
        });

        placemarksRef.current[String(p.code)] = placemark;
        return placemark;
      });

    if (points.length) clustererRef.current.add(points);

    // если уже есть выбранный код — восстановим подсветку после перерендера
    if (selectedPvzCode) {
      highlightPlacemark(String(selectedPvzCode), false);
    }
  }

  async function recenterToCity(ymaps: any, name: string, list: PvzCommon[]) {
    try {
      const res = await ymaps.geocode(name);
      const first = res?.geoObjects?.get(0);
      const bounds = first?.properties?.get('boundedBy');
      if (bounds && mapRef.current) {
        mapRef.current.setBounds(bounds, {
          checkZoomRange: true,
          duration: 300,
        });

        setTimeout(() => mapRef.current?.container.fitToViewport(), 0);

        return;
      }
    } catch {}

    // Fallback — центрируемся по точкам, если геокодер не дал границы
    if (list?.length) fitToOffices(ymaps, list);
  }

  function fitToOffices(ymaps: any, list: PvzCommon[]) {
    if (!mapRef.current) return;
    const coords = list
      .map((p) => [Number(p?.location?.latitude), Number(p?.location?.longitude)])
      .filter(([a, b]) => Number.isFinite(a) && Number.isFinite(b));
    if (!coords.length) return;
    const bounds = ymaps.util.bounds.fromPoints(coords);
    mapRef.current.setBounds(bounds, { checkZoomRange: true, duration: 300 });
    setTimeout(() => mapRef.current?.container.fitToViewport(), 0);
  }

  function highlightPlacemark(code: string, openBalloon: boolean) {
    const pm = placemarksRef.current[code];
    if (!pm || !mapRef.current) return;

    // сброс всем
    Object.values(placemarksRef.current).forEach((x: any) => x.options.set('preset', PRESET_DEFAULT));

    // выделяем выбранный
    pm.options.set('preset', PRESET_SELECTED);

    // гарантируем видимость: приблизимся и панорамируем к точке
    const coords = pm.geometry.getCoordinates();
    const zoom = mapRef.current.getZoom();
    if (zoom < 14) mapRef.current.setZoom(14, { duration: 150 });
    mapRef.current.panTo(coords, { flying: true, duration: 300 });

    if (openBalloon) {
      try {
        pm.balloon.open();
      } catch {}
    }
  }

  function escapeHtml(s: string) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ресайз контейнера -> обновляем вьюпорт карты
  useEffect(() => {
    if (!isReady || !mapRef.current || !mapContainerRef.current) return;
    const ro = new ResizeObserver(() => {
      try {
        mapRef.current?.container.fitToViewport();
      } catch {}
    });
    ro.observe(mapContainerRef.current);
    return () => ro.disconnect();
  }, [isReady]);

  // Когда офисы обновились и карта готова — рисуем маркеры (на следующий кадр)
  useEffect(() => {
    if (!isReady || !offices) return;
    const ymaps = (window as any).ymaps;
    // дождёмся layout’а контейнера
    requestAnimationFrame(() => {
      setTimeout(() => {
        renderOffices(ymaps, offices);
        if (!cityName && offices.length) fitToOffices(ymaps, offices);
      }, 0);
    });
  }, [isReady, offices, cityName]);

  // смена города -> центрируем(после инициализации карты)
  useEffect(() => {
    if (!isReady || !cityName || !mapRef.current) return;
    const ymaps = (window as any).ymaps;
    recenterToCity(ymaps, cityName, offices);
  }, [isReady, cityName, offices]);

  // выбор ПВЗ извне (из селекта) -> подсветить/центрировать/открыть балун
  useEffect(() => {
    if (!isReady || !selectedPvzCode) return;
    highlightPlacemark(String(selectedPvzCode), true);
  }, [selectedPvzCode, isReady]);

  return (
    <div className={clsx('relative w-full rounded-md', className)} style={{ height }}>
      {loading && (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner size={40} color="#FDB51B" />
        </div>
      )}
      <div
        ref={mapContainerRef}
        className="h-full w-full rounded-md"
        style={{ visibility: loading ? 'hidden' : 'visible' }}
      />
    </div>
  );
}
