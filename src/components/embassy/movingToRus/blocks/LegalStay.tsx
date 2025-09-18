import { useModal } from "@/context/ModalContext";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function LegalStay() {
  const { openModal } = useModal();
  const t = useTranslations("embassy.legalStay");
  const docsForLegalStay = t.raw("items") as Array<{
    label: string;
    description: string;
  }>;

  return (
    <section className="w-full justify-center flex flex-col items-center">
      <h3 className="text-[20px] sm:text-[30px] font-semibold mb-[40px] sm:mb-[70px] text-center px-[20px]">
        {t("title")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1050px] px-[15px]">
        {docsForLegalStay.map((doc, idx) => (
          <div
            key={idx}
            className="relative rounded-[10px] sm:rounded-[25px] overflow-hidden shadow-md group max-h-[200px] sm:max-h-[250px] lg:max-h-[320px]"
          >
            <Image
              src={`/images/embassy/${
                [
                  "temp-stay",
                  "temporary-residence",
                  "residence-permit",
                  "work-patent",
                ][idx]
              }.webp`}
              alt={doc.label}
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />

            <button
              onClick={() =>
                openModal("document", {
                  data: {
                    title: doc.label,
                    text: doc.description,
                    image: `/images/embassy/${
                      [
                        "temp-stay",
                        "temporary-residence",
                        "residence-permit",
                        "work-patent",
                      ][idx]
                    }.webp`,
                  },
                })
              }
              className="min-w-[260px] absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/50 p-[10px] text-[12px] sm:text-[14px] rounded-[10px] cursor-pointer text-center hover:bg-white/60 transition duration-300"
            >
              <span className="font-bold text-white break-words lg:whitespace-nowrap whitespace-normal">
                {doc.label}
              </span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
