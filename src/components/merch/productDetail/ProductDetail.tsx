'use client';

import HeaderNav from '@/components/headerNav/HeaderNav';
import CustomSelect from '@/components/ui/inputs/customSelect/CustomSelect';
import { CartItem } from '@/types/cart';
import { MerchItem } from '@/types/merch';
import { useState } from 'react';
import st from './styles.module.css';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface Props {
  product: MerchItem;
  onAddToCart: (item: CartItem) => void;
}

export default function ProductDetail({ product, onAddToCart }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [activeImage, setActiveImage] = useState(0);

  const sizeOptions = product.sizes.map((s) => ({ value: s, label: s }));

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <HeaderNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} hasBackground />

      <section className={st.wrapper}>
        <div className="flex w-full max-w-[480px] flex-col justify-between lg:max-w-[900px] lg:flex-row xl:mx-auto xl:max-w-[1100px]">
          <div className={st.imageSection}>
            <div className={st.imageWrapper}>
              <img src={product.images[activeImage]} className={st.mainImage} />

              <button onClick={prevImage} className={`${st.arrow} ${st.leftArrow}`}>
                <IconChevronLeft size={20} color="white" />
              </button>
              <button onClick={nextImage} className={`${st.arrow} ${st.rightArrow}`}>
                <IconChevronRight size={20} color="white" />
              </button>
            </div>

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
                  className={`${st.thumb} ${i === activeImage ? st.active : ''}`}
                  onClick={() => setActiveImage(i)}
                />
              ))}
            </div>
          </div>

          <div className={st.info}>
            <h1 className={st.title}>{product.name}</h1>
            <p className={st.price}>{product.price} р.</p>

            <div className="flex w-full flex-col gap-[30px] lg:max-w-[230px]">
              <div className="w-full">
                <label className="mb-2 block text-base text-[#9F9F9F]">Размер</label>
                <CustomSelect
                  name="size"
                  value={selectedSize}
                  options={sizeOptions}
                  onValueChange={setSelectedSize}
                  selectClassName={st.select}
                  wrapperClassName={st.selectWrapper}
                  readOnlyInput
                  clearable={false}
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

            <div className="flex w-full flex-col gap-[10px] text-sm text-[#9F9F9F] sm:text-base lg:max-w-[390px]">
              <span>Размерная:</span>
              <ul className="">
                {product.sizeDescription.map((p, i) => (
                  <li key={i} className="leading-[1.3]">
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-[20px] lg:mt-[30px]">Футболка, плотность {product.density}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
