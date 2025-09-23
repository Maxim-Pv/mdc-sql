'use client';

import { useCart } from '@/providers/CartContext';
import { IconCircleMinus, IconCirclePlus, IconTrashX, IconX } from '@tabler/icons-react';
import clsx from 'clsx';
import { useEffect } from 'react';
import st from './styles.module.css';

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
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={st.overlay} onClick={onClose}>
      <div className={clsx(st.modal, 'flex flex-col')} onClick={(e) => e.stopPropagation()}>
        <button className={st.close} onClick={onClose}>
          <IconX size={24} />
        </button>
        <h2 className="mb-4 text-xl font-semibold">Ваш заказ</h2>

        <div className="flex-1 overflow-y-auto">
          {items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="mb-4 flex items-center last:mb-0">
              <div className="flex flex-1 items-center">
                <img
                  src={item.image}
                  className="mr-4 h-[80px] w-[60px] flex-shrink-0 rounded object-cover lg:h-[120px] lg:w-[90px]"
                  alt={item.name}
                />
                <div className="flex max-w-[170px] flex-1 flex-col gap-[10px] text-sm">
                  <p className="font-medium uppercase">{item.name}</p>
                  <p className="text-gray-500">Размер: {item.size}</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 lg:flex-row lg:gap-10">
                <div className="flex items-center gap-2">
                  <button className={st.iconButton} onClick={() => decrement(item.id, item.size)}>
                    <IconCircleMinus size={24} />
                  </button>
                  <output className="min-w-[25px] text-center text-xs font-medium lg:text-lg">{item.qty}</output>
                  <button className={st.iconButton} onClick={() => increment(item.id, item.size)}>
                    <IconCirclePlus size={24} />
                  </button>
                </div>
                <p className="min-w-[90px] font-medium">{item.price * item.qty} р.</p>
              </div>
              <button className={st.trashButton + ' ml-[10px]'} onClick={() => removeItem(item.id, item.size)}>
                <IconTrashX size={24} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t pt-4">
          <div className="mb-2 flex items-center justify-end gap-5">
            <span>Сумма:</span>
            <span className="font-semibold">{total} р.</span>
          </div>
          <button className={st.btnOrder}>Оформить заказ</button>
        </div>
      </div>
    </div>
  );
}
