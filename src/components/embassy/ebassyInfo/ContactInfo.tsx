"use client";

import YandexMapDynamic from "@/components/maps/YandexMapDynamic";
import { ContactContent, CONTACTS } from "@/constant/embassy/contactContent";
import { IconMail } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

const EMBASSY_COORDS: [number, number] = [55.7619244697269, 37.622801894345955];

function OfficeInfo({ data }: { data: ContactContent }) {
  const t = useTranslations("embassy.contact");
  const { address, phone, fax, email } = data;
  return (
    <div className="space-y-2 text-xs sm:text-base">
      <p className="font-medium mb-4 w-[95%] lg:w-full">
        {" "}
        {t("addressLabel")} {address}
      </p>
      <p className="font-semibold text-base text-[#ED1846]">{phone}</p>
      {fax && (
        <p>
          {t("faxLabel")} {fax}
        </p>
      )}

      <div
        className="inline-flex items-center gap-2 px-3 py-2 border rounded-[10px] w-fit"
        style={{ borderColor: "#234BA0" }}
      >
        <IconMail size={22} strokeWidth={1.5} color="#234BA0" />
        <span className="font-semibold text-xs sm:text-base text-[#234BA0]">
          {email}
        </span>
      </div>
    </div>
  );
}

export default function ContactInfo() {
  const t = useTranslations("embassy.contact");
  return (
    <section className="w-full px-4 py-10 pb-20 bg-[#F3F4F6]">
      <div className="max-w-[1110px] mx-auto">
        <h3 className="text-[20px] sm:text-[30px] font-semibold text-center px-[15px] max-w-[1100px] mx-auto">
          {t("heading")}
        </h3>

        <div className="mt-10 bg-white rounded-[20px] shadow-[0px_0px_20px_rgba(0,0,0,0.25)] flex flex-col-reverse md:flex-row overflow-hidden">
          <div className="min-h-[300px] md:w-[50%]">
            <YandexMapDynamic
              coords={EMBASSY_COORDS}
              name={t("mapName")}
              className="h-[300px] sm:h-[400px] md:h-full"
            />
          </div>

          <div className="p-[15px] md:p-[20px] flex flex-col gap-8 md:w-[50%] text-left">
            {CONTACTS.map((c) => (
              <OfficeInfo key={c.email} data={c} />
            ))}

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
              <div className="text-[#848484] text-xs">
                <h4 className="font-semibold mb-3 text-black">
                  {t("working.title")}
                </h4>
                <p className="text-black">{t("working.days")}</p>
                <p>{t("working.reception")}</p>
                <p>{t("working.issuance")}</p>
                <p>{t("working.lunch")}</p>
              </div>
              <div className="text-[#848484] text-xs">
                <h4 className="font-semibold mb-3 text-black">
                  {" "}
                  {t("daysOff.title")}
                </h4>
                <p className="text-black">{t("daysOff.days")}</p>
                <p className="text-black">{t("daysOff.andHolidays")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
