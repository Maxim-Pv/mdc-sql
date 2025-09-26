'use client';

import { useEffect } from 'react';
import { useCdekDelivery } from '../hooks/useCdekDelivery';
import CustomSelect from '../ui/inputs/customSelect/CustomSelect';
import YandexPvzMap from './YMapPvz';
import CitySelect from './CitySelect';

type Props = {
  totalWeightGrams?: number;
  initialCity?: { code: string; name: string };
  onChangeCity: (code: string, name: string) => void;
  valuePvz: string;
  onChangePvz: (code: string, address?: string) => void;
  onQuoteChange?: (price: number | null, days: string | null) => void;
};
export function CdekDeliveryPicker({
  totalWeightGrams = 250,
  initialCity = { code: '44', name: 'Москва' },
  onChangeCity,
  valuePvz,
  onChangePvz,
  onQuoteChange,
}: Props) {
  const cdek = useCdekDelivery(initialCity.code, initialCity.name);

  // синхроним внешнее состояние с хука (если нужно)
  useEffect(() => {
    if (valuePvz !== cdek.selectedPvzCode) cdek.setSelectedPvzCode(valuePvz || '');
  }, [valuePvz]);

  useEffect(() => {
    onQuoteChange?.(cdek.price, cdek.days);
  }, [cdek.price, cdek.days]);

  return (
    <div className="space-y-3">
      <CitySelect
        value={cdek.cityCode}
        onChange={(code, name) => {
          cdek.setCity(code, name);
          onChangeCity(code, name);
          // onChangePvz("", "");
        }}
      />

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
          cdek.quote(Number(cdek.cityCode), totalWeightGrams);
        }}
      />

      <div className="w-full overflow-hidden rounded border border-gray-300">
        <YandexPvzMap
          cityName={cdek.cityName}
          offices={cdek.offices}
          onPick={(p: any) => {
            const code = String(p.code);
            const address = p?.location?.address_full || p?.address || '';
            cdek.setSelectedPvzCode(code);
            onChangePvz(code, address);
            cdek.quote(Number(cdek.cityCode), totalWeightGrams);
          }}
          selectedPvzCode={cdek.selectedPvzCode}
          height={360}
        />
      </div>

      <div className="text-sm text-gray-700">
        <div>Доставка: {cdek.price != null ? `${cdek.price} р.` : '—'}</div>
        <div>{cdek.days ? `Срок: ${cdek.days} дн.` : ''}</div>
      </div>
    </div>
  );
}
