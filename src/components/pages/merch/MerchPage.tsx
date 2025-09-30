'use client';

import HeaderNav from '@/components/headerNav/HeaderNav';
import MerchHeroBlock from '@/components/merch/heroBlock/MerchHeroBlock';
import MerchAfterPay from '@/components/merch/MerchAfterPay';
import ProductList from '@/components/merch/productList/ProductList';
import { useState } from 'react';

export default function MerchPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="mx-auto flex min-h-[100vh] max-w-[1440px] flex-col gap-[40px] bg-white pb-[50px] sm:gap-[75px] lg:pb-[200px]">
      <HeaderNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <MerchHeroBlock />
      <ProductList />
      <MerchAfterPay />
    </div>
  );
}
