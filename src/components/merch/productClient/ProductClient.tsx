"use client";

import { useCart } from "@/context/CartContext";
import { useModal } from "@/context/ModalContext";
import { CartItem } from "@/types/cart";
import { MerchItem } from "@/types/merch";
import ProductDetail from "../productDetail/ProductDetail";

export default function ProductClient({ product }: { product: MerchItem }) {
  const { addItem } = useCart();
  const { openModal } = useModal();

  const handleAdd = (item: CartItem) => {
    addItem(item);
    openModal("cart");
  };

  return <ProductDetail product={product} onAddToCart={handleAdd} />;
}
