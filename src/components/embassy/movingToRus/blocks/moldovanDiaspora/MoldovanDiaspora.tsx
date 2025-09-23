import { cities, mainCity } from '@/constant/cities';
import { useModal } from '@/providers/ModalContext';
import { useTranslations } from 'next-intl';
import st from './styles.module.css';

export default function MoldovanDiaspora() {
  const { openModal } = useModal();
  const t = useTranslations('embassy.diaspora');

  const handleOpen = (cityName: string) => {
    const found = cities.find((c) => c.name === cityName) || mainCity.find((c) => c.name === cityName);

    if (found) openModal('city', { city: found });
  };
  return (
    <section className="flex w-full max-w-[1110px] flex-col items-center">
      <div className="flex flex-col items-center justify-center gap-[50px] sm:gap-[70px]">
        <h3 className="max-w-[1030px] px-[20px] text-center text-[20px] font-semibold sm:text-[30px]">{t('title')}</h3>
        <div className="flex w-full max-w-[1030px] flex-col justify-center gap-[20px] px-[15px] text-center text-sm sm:text-base">
          <p>{t('paragraph1')}</p>
          <p>{t('paragraph2')}</p>
        </div>
        <div className={st.activeCity}>
          <h3 className="flex-1 text-center text-[20px] leading-[100%] uppercase md:flex-initial">
            {/* Города с активными молдавскими <br className="lg:hidden" />{" "}
            общинами:  */}
            {t('activeCitiesTitle')}
          </h3>

          <div className="flex w-fit flex-col justify-start gap-6 pb-[20px] pl-[30px]">
            <div className="grid grid-cols-2 justify-items-start sm:grid-cols-4 md:grid-cols-2">
              {mainCity.map((city, idx) => (
                <button key={idx} onClick={() => handleOpen(city.name)} className={`${st.cityLink} ${st.mainCity}`}>
                  {city.name}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 justify-items-start gap-y-3 sm:grid-cols-4 sm:gap-x-2 md:grid-cols-2">
              {cities.map((city, idx) => (
                <button key={idx} onClick={() => handleOpen(city.name)} className={st.cityLink}>
                  {city.name}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-xs sm:px-[20px] sm:text-base">{t('footer')}</p>
        </div>
      </div>
    </section>
  );
}
