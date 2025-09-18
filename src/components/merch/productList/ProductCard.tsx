import Link from "next/link";
import st from "./styles.module.css";
import { MerchItem } from "@/types/merch";

export default function ProductCard({ images, name, price, slug }: MerchItem) {
  return (
    <Link href={`/merch/${slug}`}>
      <div className="flex flex-col gap-[10px] sm:gap-[30px]">
        <div className={st.card}>
          <img src={images[0]} alt={name} className={st.image} />
        </div>
        <div className={st.info}>
          <p className={st.title}>{name}</p>
          <p className={st.price}>{price}р.</p>
          <button className={st.button}>в корзину</button>
        </div>
      </div>
    </Link>
  );
}
