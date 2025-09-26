'use client';

import { useCdekDelivery } from '@/components/hooks/delivery/useCdekDelivery';
import { useEffect, useState } from 'react';
import CustomSelect from '../../ui/inputs/customSelect/CustomSelect';
import YandexPvzMap from '../YMapPvz';
import st from './styles.module.css';

type Props = {
  city: { code: string; name: string };
  totalWeightGrams?: number;
  valuePvz: string;
  onChangePvz: (code: string, address?: string) => void;
  onQuoteChange?: (price: number | null, days: string | null) => void;
};
export function CdekDeliveryPicker({ city, totalWeightGrams = 250, valuePvz, onChangePvz, onQuoteChange }: Props) {
  const cdek = useCdekDelivery(city.code || '44', city.name || 'Москва');
  const [showPvzInfo, setShowPvzInfo] = useState(false);
  const [pickedPvz, setPickedPvz] = useState<any | null>(null);

  useEffect(() => {
    const clean = (city.name || '').split(',')[0].trim();
    if (cdek.cityCode !== city.code || cdek.cityName !== clean) {
      cdek.setCity(city.code, clean);
    }
  }, [city]);

  // useEffect(() => {
  //   setShowPvzInfo(false);
  //   setPickedPvz(null);
  //   cdek.setSelectedPvzCode("");
  // }, [cdek.cityName]);

  useEffect(() => {
    if (valuePvz !== cdek.selectedPvzCode) cdek.setSelectedPvzCode(valuePvz || '');
  }, [valuePvz]);

  useEffect(() => {
    onQuoteChange?.(cdek.price, cdek.days);
  }, [cdek.price, cdek.days, onQuoteChange]);

  const getPvzAddress = (p: any) => p?.location?.address_full || p?.location?.address || p?.address || '';

  // карточка выбранного ПВЗ
  const PvzInfo = ({ pvz }: { pvz: any }) => {
    const code = pvz?.code ? String(pvz.code) : '';
    const addrFull = getPvzAddress(pvz);
    const addrShort = pvz?.location?.address || pvz?.address || addrFull;
    const extra = pvz?.location?.address_comment || pvz?.note || pvz?.nearest_station || '';
    const work = pvz?.work_time;
    const phone = pvz?.phones?.[0]?.number || pvz?.phone || pvz?.phones?.[0]?.value || '';

    return (
      <div className="w-full rounded border border-gray-300 p-3">
        <div className="mb-3 font-semibold">Пункт получения:</div>
        <div className="mb-2">
          <span>{code}</span>
          {addrFull ? `, ${addrFull}` : ''}
        </div>

        {addrShort && <div className="mb-2">Адрес: {addrShort}</div>}
        {extra && <div className="mb-2 text-sm text-gray-500">{extra}</div>}
        {work && <div className="mb-1">Время работы: {work}</div>}
        {phone && <div>Телефон: {phone}</div>}

        <button
          type="button"
          className="mt-3 cursor-pointer text-gray-800 underline hover:text-black"
          onClick={() => setShowPvzInfo(false)}
        >
          Изменить
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-[30px]">
      <CustomSelect
        name="pvz"
        value={cdek.selectedPvzCode}
        options={cdek.pvzOptions}
        placeholder="Пункт получения"
        onValueChange={(code) => {
          const pvz = cdek.offices.find((p: any) => String(p.code) === code);
          const address = pvz?.location?.address_full || pvz?.address || '';
          cdek.setSelectedPvzCode(code);
          onChangePvz(code, address);
          cdek.quote(Number(pvz?.city_code), totalWeightGrams);

          setPickedPvz(pvz);
          setShowPvzInfo(true);
        }}
        selectClassName={st.select}
      />

      {showPvzInfo && pickedPvz ? (
        <PvzInfo pvz={pickedPvz} />
      ) : (
        <div className="w-full overflow-hidden rounded border border-gray-300">
          <YandexPvzMap
            cityName={cdek.cityName}
            offices={cdek.offices}
            selectedPvzCode={cdek.selectedPvzCode}
            onPick={(p: any) => {
              const code = String(p.code);
              const address = getPvzAddress(p);
              cdek.setSelectedPvzCode(code);
              onChangePvz(code, address);
              cdek.quote(Number(p.city_code || cdek.cityCode), totalWeightGrams);

              // показываем карточку вместо карты
              setPickedPvz(p);
              setShowPvzInfo(true);
            }}
            height={360}
          />
        </div>
      )}

      <div className="text-sm text-gray-700">
        <div>Доставка: {cdek.price != null ? `${cdek.price} р.` : '—'}</div>
        <div>{cdek.days ? `Срок: ${cdek.days} дн.` : ''}</div>
      </div>
    </div>
  );
}
