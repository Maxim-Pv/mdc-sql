"use client";

import HeaderNav from "@/components/headerNav/HeaderNav";
import CustomSelect from "@/components/ui/inputs/customSelect/CustomSelect";
import { CartItem } from "@/types/cart";
import { MerchItem } from "@/types/merch";
import { useState } from "react";
import st from "./styles.module.css";

interface Props {
  product: MerchItem;
  onAddToCart: (item: CartItem) => void;
}

export default function ProductDetail({ product, onAddToCart }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [activeImage, setActiveImage] = useState(0);

  const sizeOptions = product.sizes.map((s) => ({ value: s, label: s }));

  return (
    <>
      <HeaderNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} hasBackground />

      <section className={st.wrapper}>
        <div className="max-w-[1100px] w-full mx-auto flex justify-between">
          <div className={st.imageSection}>
            <img src={product.images[activeImage]} className={st.mainImage} />

            <div
              className={st.thumbList}
              onWheel={(e) => {
                e.currentTarget.scrollLeft += e.deltaY;
              }}
            >
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className={`${st.thumb} ${
                    i === activeImage ? st.active : ""
                  }`}
                  onClick={() => setActiveImage(i)}
                />
              ))}
            </div>
          </div>

          <div className={st.info}>
            <h1 className={st.title}>{product.name}</h1>
            <p className={st.price}>{product.price} р.</p>

            <div className="flex flex-col gap-[30px] max-w-[230px]">
              <div className="w-full">
                <label className="block mb-2 text-base text-[#9F9F9F]">
                  Размер
                </label>
                <CustomSelect
                  name="size"
                  value={selectedSize}
                  options={sizeOptions}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  selectClassName={st.select}
                  wrapperClassName={st.selectWrapper}
                  placeholder="Выберите размер"
                />
              </div>

              <button
                className={st.buyButton}
                onClick={() =>
                  onAddToCart({
                    id: product.slug,
                    name: product.name,
                    size: selectedSize,
                    qty: 1,
                    price: product.price,
                    image: product.images[0],
                  })
                }
              >
                В корзину
              </button>
            </div>

            <div className="flex flex-col gap-[10px] max-w-[390px] text-[#9F9F9F] text-sm sm:text-base">
              <span>Размерная</span>
              <ul className="">
                {product.sizeDescription.map((p, i) => (
                  <li key={i} className="leading-[1.3]">
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-[30px]">Футболка, плотность {product.density}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
