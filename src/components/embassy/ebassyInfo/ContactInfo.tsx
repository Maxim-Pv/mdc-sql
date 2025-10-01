'use client';

import YandexMapDynamic from '@/components/maps/YandexMapDynamic';
import { ContactContent, CONTACTS } from '@/constant/embassy/contactContent';
import { IconMail } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

const EMBASSY_COORDS: [number, number] = [55.7619244697269, 37.622801894345955];

function OfficeInfo({ data }: { data: ContactContent }) {
  const t = useTranslations('embassy.contact');
  const { address, phone, fax, email } = data;
  return (
    <div className="space-y-2 text-xs sm:text-base">
      <p className="mb-4 w-[95%] font-medium lg:w-full">
        {' '}
        {t('addressLabel')} {address}
      </p>
      <p className="text-base font-semibold text-[#ED1846]">{phone}</p>
      {fax && (
        <p>
          {t('faxLabel')} {fax}
        </p>
      )}

      <div
        className="inline-flex w-fit items-center gap-2 rounded-[10px] border px-3 py-2"
        style={{ borderColor: '#234BA0' }}
      >
        <IconMail size={22} strokeWidth={1.5} color="#234BA0" />
        <span className="text-xs font-semibold text-[#234BA0] sm:text-base">{email}</span>
      </div>
    </div>
  );
}

export default function ContactInfo() {
  const t = useTranslations('embassy.contact');
  return (
    <section className="w-full px-4 py-10 pb-20">
      <div className="mx-auto max-w-[1110px]">
        <h3 className="mx-auto max-w-[1100px] px-[15px] text-center text-[20px] font-semibold sm:text-[30px]">
          {t('heading')}
        </h3>

        <div className="mt-10 flex flex-col-reverse overflow-hidden rounded-[20px] bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.25)] md:flex-row">
          <div className="min-h-[300px] md:w-[50%]">
            <YandexMapDynamic
              coords={EMBASSY_COORDS}
              name={t('mapName')}
              className="h-[300px] sm:h-[400px] md:h-full"
            />
          </div>

          <div className="flex flex-col gap-8 p-[15px] text-left md:w-[50%] md:p-[20px]">
            {CONTACTS.map((c) => (
              <OfficeInfo key={c.email} data={c} />
            ))}

            <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
              <div className="text-xs text-[#848484]">
                <h4 className="mb-3 font-semibold text-black">{t('working.title')}</h4>
                <p className="text-black">{t('working.days')}</p>
                <p>{t('working.reception')}</p>
                <p>{t('working.issuance')}</p>
                <p>{t('working.lunch')}</p>
              </div>
              <div className="text-xs text-[#848484]">
                <h4 className="mb-3 font-semibold text-black"> {t('daysOff.title')}</h4>
                <p className="text-black">{t('daysOff.days')}</p>
                <p className="text-black">{t('daysOff.andHolidays')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
