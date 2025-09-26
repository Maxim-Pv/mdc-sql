'use client';

import HeaderNav from '@/components/headerNav/HeaderNav';
import MerchHeroBlock from '@/components/merch/heroBlock/MerchHeroBlock';
import ProductList from '@/components/merch/productList/ProductList';
import { useState } from 'react';

export default function MerchPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-[100vh] flex-col gap-[40px] bg-white pb-[50px] sm:gap-[75px] lg:pb-[200px]">
      <HeaderNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <MerchHeroBlock />
      <ProductList />
    </div>
  );
}
