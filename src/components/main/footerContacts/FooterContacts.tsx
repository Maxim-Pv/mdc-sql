import { useTranslations } from "next-intl";

const linkConfig = [
  { key: "privacy", href: "/policy" },
  { key: "consent", href: "/consent" },
  { key: "program", href: "/" },
];

export default function FooterContacts() {
  const t = useTranslations("main.footer");
  return (
    <div className="max-w-[1200px] w-full px-[20px] py-[30px] text-[#848484]">
      <div className="text-left w-full items-start sm:flex sm:justify-between ">
        <div className="flex flex-col gap-5 text-[14px]">
          <p>{t("contactTitle")}</p>
          <p>{t("email")}</p>
        </div>

        <div className="flex flex-col gap-[6px] mt-[20px] sm:mt-0 text-[12px] sm:text-[14px] sm:w-[50%] sm:text-right">
          {linkConfig.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="hover:underline"
              aria-label={t(`links.${key}`)}
            >
              {t(`links.${key}`)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
