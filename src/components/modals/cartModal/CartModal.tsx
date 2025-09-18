"use client";

import { useCart } from "@/context/CartContext";
import {
  IconCircleMinus,
  IconCirclePlus,
  IconTrashX,
  IconX,
} from "@tabler/icons-react";
import clsx from "clsx";
import { useEffect } from "react";
import st from "./styles.module.css";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, total, increment, decrement, removeItem } = useCart();

  useEffect(() => {
    if (isOpen && items.length === 0) {
      onClose();
    }
  }, [items, isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={st.overlay} onClick={onClose}>
      <div
        className={clsx(st.modal, "flex flex-col")}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={st.close} onClick={onClose}>
          <IconX size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Ваш заказ</h2>

        <div className="flex-1 overflow-y-auto">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex items-center mb-4 last:mb-0"
            >
              <div className="flex items-center flex-1">
                <img
                  src={item.image}
                  className="w-[60px] h-[80px] flex-shrink-0 lg:w-[90px] lg:h-[120px] object-cover rounded mr-4"
                  alt={item.name}
                />
                <div className="flex-1 max-w-[170px] flex flex-col gap-[10px] text-sm">
                  <p className="font-medium uppercase">{item.name}</p>
                  <p className="text-gray-500">Размер: {item.size}</p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-10">
                <div className="flex items-center gap-2">
                  <button
                    className={st.iconButton}
                    onClick={() => decrement(item.id, item.size)}
                  >
                    <IconCircleMinus size={24} />
                  </button>
                  <output className="text-xs lg:text-lg font-medium min-w-[25px] text-center">
                    {item.qty}
                  </output>
                  <button
                    className={st.iconButton}
                    onClick={() => increment(item.id, item.size)}
                  >
                    <IconCirclePlus size={24} />
                  </button>
                </div>
                <p className="font-medium min-w-[90px]">
                  {item.price * item.qty} р.
                </p>
              </div>
              <button
                className={st.trashButton + " ml-[10px]"}
                onClick={() => removeItem(item.id, item.size)}
              >
                <IconTrashX size={24} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex gap-5 mb-2 items-center justify-end">
            <span>Сумма:</span>
            <span className="font-semibold">{total} р.</span>
          </div>
          <button className={st.btnOrder}>Оформить заказ</button>
        </div>
      </div>
    </div>
  );
}
