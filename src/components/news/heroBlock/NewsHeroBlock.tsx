import st from "./styles.module.css";

export default function NewsHeroBlock() {
  return (
    <section className="w-full">
      <div className={st.heroContainer}>
        <div className="w-full lg:max-w-[850px] xl:max-w-[1110px] flex flex-col gap-20 items-center lg:flex-row lg:items-start lg:gap-0 xl:justify-between">
          <h1 className={st.heroTitle}>
            ближайшие мероприятия <span className="whitespace-nowrap">и акции</span>
          </h1>
          <div className={st.card}>
            <img src="/images/news/варвус.webp" alt="мероприятие" className={st.cardImage} />
            <div className={st.cardOverlay}>
              <span className={st.cardDate}>6 сентября</span>
              <p className={st.cardText}>Вокальная мастерская Ольги Варвус: Ищем юные таланты!</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-full lg:max-w-[850px] xl:max-w-[1110px] mx-auto">
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-[15px] lg:gap-[20px] mt-[30px] px-[15px] lg:px-0">
          {heroCards.map((item, i) => (
            <NewsCard key={i} {...item} />
          ))}
        </div>
      </div> */}
    </section>
  );
}
