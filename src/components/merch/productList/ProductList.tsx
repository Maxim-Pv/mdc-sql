import { loadMerchStatic } from '@/lib/merch';
import ProductCard from './ProductCard';
import st from './styles.module.css';

export default function ProductList() {
  const merchDetail = loadMerchStatic();
  return (
    <section className={st.gridWrapper}>
      <div className={st.grid}>
        {merchDetail.map((product) => (
          <ProductCard key={product.slug} {...product} />
        ))}
      </div>
    </section>
  );
}
