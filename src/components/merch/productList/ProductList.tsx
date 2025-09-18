import { merchDetail } from "@/constant/merch/merchDetail";
import ProductCard from "./ProductCard";
import st from "./styles.module.css";

export default function ProductList() {
  return (
    <section className={st.gridWrapper}>
      <div className={st.grid}>
        {merchDetail.map((product, idx) => (
          <ProductCard key={idx} {...product} />
        ))}
      </div>
    </section>
  );
}
