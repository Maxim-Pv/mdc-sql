'use client';

import { useCart } from '@/providers/CartContext';
import { useModal } from '@/providers/ModalContext';
import { CartItem } from '@/types/cart';
import ProductDetail from '../productDetail/ProductDetail';
import { MerchItem } from '@/lib/schemes/merchSchema';

export default function ProductClient({ product }: { product: MerchItem }) {
  const { addItem } = useCart();
  const { openModal } = useModal();

  const handleAdd = (item: CartItem) => {
    addItem(item);
    openModal('cart');
  };

  return <ProductDetail product={product} onAddToCart={handleAdd} />;
}
