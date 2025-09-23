import { useModal } from '@/providers/ModalContext';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function LegalStay() {
  const { openModal } = useModal();
  const t = useTranslations('embassy.legalStay');
  const docsForLegalStay = t.raw('items') as Array<{
    label: string;
    description: string;
  }>;

  return (
    <section className="flex w-full flex-col items-center justify-center">
      <h3 className="mb-[40px] px-[20px] text-center text-[20px] font-semibold sm:mb-[70px] sm:text-[30px]">
        {t('title')}
      </h3>

      <div className="grid w-full max-w-[1050px] grid-cols-1 gap-6 px-[15px] md:grid-cols-2">
        {docsForLegalStay.map((doc, idx) => (
          <div
            key={idx}
            className="group relative max-h-[200px] overflow-hidden rounded-[10px] shadow-md sm:max-h-[250px] sm:rounded-[25px] lg:max-h-[320px]"
          >
            <Image
              src={`/images/embassy/${
                ['temp-stay', 'temporary-residence', 'residence-permit', 'work-patent'][idx]
              }.webp`}
              alt={doc.label}
              width={500}
              height={300}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />

            <button
              onClick={() =>
                openModal('document', {
                  data: {
                    title: doc.label,
                    text: doc.description,
                    image: `/images/embassy/${
                      ['temp-stay', 'temporary-residence', 'residence-permit', 'work-patent'][idx]
                    }.webp`,
                  },
                })
              }
              className="absolute bottom-4 left-1/2 min-w-[260px] -translate-x-1/2 cursor-pointer rounded-[10px] bg-white/50 p-[10px] text-center text-[12px] transition duration-300 hover:bg-white/60 sm:text-[14px]"
            >
              <span className="font-bold break-words whitespace-normal text-white lg:whitespace-nowrap">
                {doc.label}
              </span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
