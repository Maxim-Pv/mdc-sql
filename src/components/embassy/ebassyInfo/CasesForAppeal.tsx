import { useTranslations } from 'next-intl';

interface Props {
  title: string;
  items: string[];
  note?: string;
  className?: string;
}

type CasesBlock = {
  title: string;
  items: string[];
  note?: string;
};

function CasesCard({ title, items, note, className = '' }: Props) {
  const baseStyle = `gap-5 flex flex-col sm:h-[340px] h-auto
rounded-[25px] shadow-[0px_0px_20px_rgba(0,0,0,0.25)] flex-1 ${className}`;

  return (
    <div className={`${baseStyle} ${'bg-white'}`}>
      <h4 className="px-[20px] pt-[20px] text-[14px] font-semibold text-[#234BA0] sm:px-[30px] sm:text-[16px]">
        {title}
      </h4>
      <div className="h-full rounded-[25px] bg-[#ED1846] p-[20px] shadow-[0px_0px_20px_rgba(0,0,0,0.25)] sm:max-h-[270px]">
        <ul className="list-disc space-y-[6px] pl-8 text-sm leading-[18px] text-white sm:space-y-[4px] sm:text-base">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        {note && <p className={`mt-[20px] text-sm font-semibold text-white sm:text-base`}>{note}</p>}
      </div>
    </div>
  );
}

export default function CasesForAppeal() {
  const t = useTranslations('embassy.cases');
  const withAppointment = t.raw('withAppointment') as CasesBlock;
  const withoutAppointment = t.raw('withoutAppointment') as CasesBlock;

  return (
    <div className="mx-auto w-full max-w-[1150px]">
      <div className="flex w-full flex-col items-center justify-center gap-[50px] sm:gap-[70px]">
        <h3 className="max-w-[1030px] px-[20px] text-center text-[20px] font-semibold sm:text-[30px]">{t('title')}</h3>
        <div className="flex w-full max-w-[1030px] flex-col justify-center gap-[20px] px-[15px] text-center text-sm sm:text-base">
          <p>{t('desc1')}</p>
          <p>{t('desc2')}</p>
        </div>
        <h3 className="max-w-[1030px] px-[20px] text-center text-[20px] font-semibold sm:text-[30px]">
          {t('subtitle')}
        </h3>

        <div className="flex w-full flex-col gap-[30px] px-[20px] lg:flex-row">
          <CasesCard
            title={withAppointment.title}
            items={withAppointment.items}
            note={withAppointment.note}
            className="basis-[55%]"
          />
          <CasesCard title={withoutAppointment.title} items={withoutAppointment.items} className="basis-[45%]" />
        </div>
      </div>
    </div>
  );
}
