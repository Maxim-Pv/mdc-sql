import { socialIcons } from "@/constant/socialIcons";
import Image from "next/image";
import FooterContacts from "../../footerContacts/FooterContacts";
import { RegistrationForm } from "../registrationForm/RegistrationForm";
import st from "./styles.module.css";
import { useTranslations } from "next-intl";

export const CitizenCardForm = ({ hasContacts }: { hasContacts?: boolean }) => {
  const t = useTranslations("main.citizenCardForm");
  return (
    <div className={st.footerWrapper}>
      <div className={st.formContainer}>
        <div className={st.backgroundMap}>
          <Image
            src="/images/main/white-card.jpg"
            alt="Карта фоном"
            fill
            className="object-contain"
            priority
          />
        </div>

        <RegistrationForm />

        <div className="mt-6 flex flex-col md:flex-row md:justify-between md:text-left text-center gap-4 md:items-start relative">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="font-bold text-[20px] sm:text-[30px]">
              +7 (499) 450-50-61
            </p>
            <p className="text-sm sm:text-[16px] text-gray-600">
              {t("supportLabel")}
            </p>
            <p className="mt-4 font-semibold text-[20px] sm:text-[30px]">
              INFO@MDCARD.RU
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-[5px] sm:gap-2">
            {socialIcons.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 p-3 hover:bg-gray-200 cursor-pointer transition-all rounded-[10px]"
              >
                {item.type === "icon" ? (
                  item.component
                ) : (
                  <img src={item.src} alt={item.alt} className="min-w-5 h-5" />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
      {hasContacts && <FooterContacts />}
    </div>
  );
};
