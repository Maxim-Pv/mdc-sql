import { useTranslations } from "next-intl";

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

function CasesCard({ title, items, note, className = "" }: Props) {
  const baseStyle = `gap-5 flex flex-col sm:h-[340px] h-auto
rounded-[25px] shadow-[0px_0px_20px_rgba(0,0,0,0.25)] flex-1 ${className}`;

  return (
    <div className={`${baseStyle} ${"bg-white"}`}>
      <h4 className="text-[#234BA0] text-[14px] sm:text-[16px] font-semibold px-[20px] sm:px-[30px] pt-[20px]">
        {title}
      </h4>
      <div
        className="bg-[#ED1846] shadow-[0px_0px_20px_rgba(0,0,0,0.25)] rounded-[25px] p-[20px] 
      sm:max-h-[270px] h-full"
      >
        <ul className="list-disc pl-8 text-sm sm:text-base space-y-[6px] sm:space-y-[4px] text-white">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        {note && (
          <p
            className={`mt-[20px] font-semibold text-white text-sm sm:text-base`}
          >
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

export default function CasesForAppeal() {
  const t = useTranslations("embassy.cases");
  const withAppointment = t.raw("withAppointment") as CasesBlock;
  const withoutAppointment = t.raw("withoutAppointment") as CasesBlock;

  return (
    <div className="w-full max-w-[1150px] mx-auto">
      <div className="w-full justify-center flex flex-col items-center gap-[50px] sm:gap-[70px]">
        <h3 className="text-[20px] sm:text-[30px] font-semibold text-center px-[20px] max-w-[1030px]">
          {t("title")}
        </h3>
        <div className="w-full flex flex-col gap-[20px] text-center justify-center max-w-[1030px] text-sm sm:text-base px-[15px]">
          <p>{t("desc1")}</p>
          <p>{t("desc2")}</p>
        </div>
        <h3 className="text-[20px] sm:text-[30px] font-semibold text-center px-[20px] max-w-[1030px]">
          {t("subtitle")}
        </h3>

        <div className="w-full flex flex-col lg:flex-row gap-[30px] px-[20px]">
          <CasesCard
            title={withAppointment.title}
            items={withAppointment.items}
            note={withAppointment.note}
            className="basis-[55%]"
          />
          <CasesCard
            title={withoutAppointment.title}
            items={withoutAppointment.items}
            className="basis-[45%]"
          />
        </div>
      </div>
    </div>
  );
}
