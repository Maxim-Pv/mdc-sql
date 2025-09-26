import CustomButton from '@/components/ui/customButton/CustomButton';
import st from './styles.module.css';

export default function MerchHeroBlock() {
  return (
    <section className={st.heroContainer}>
      <div className="">
        <h1 className={st.heroTitle}>Традиции, которые хочется носить</h1>
      </div>
    </section>
  );
}
