import st from './styles.module.css';

export default function NewsHeroBlock() {
  return (
    <section className="w-full">
      <div className={st.heroContainer}>
        <div className="flex w-full flex-col items-center gap-20 lg:max-w-[850px] lg:flex-row lg:items-start lg:gap-0 xl:max-w-[1110px] xl:justify-between">
          <h1 className={st.heroTitle}>
            ближайшие мероприятия <span className="whitespace-nowrap">и акции</span>
          </h1>
          <div className={st.card}>
            <img src="/images/news/varvus.webp" alt="мероприятие" className={st.cardImage} />
            <div className={st.cardOverlay}>
              <span className={st.cardDate}>6 сентября</span>
              <p className={st.cardText}>Вокальная мастерская Ольги Варвус: Ищем юные таланты!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
