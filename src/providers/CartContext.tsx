'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { CartItem } from '@/types/cart';

type CartState = { items: CartItem[] };
type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string; size: string } }
  | { type: 'INCREMENT'; payload: { id: string; size: string } }
  | { type: 'DECREMENT'; payload: { id: string; size: string } }
  | { type: 'SET_ITEMS'; payload: CartItem[] }
  | { type: 'CLEAR' };

const initialState: CartState = { items: [] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const ex = state.items.find((i) => i.id === action.payload.id && i.size === action.payload.size);
      if (ex) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id && i.size === action.payload.size
              ? { ...i, qty: i.qty + action.payload.qty }
              : i,
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter((i) => !(i.id === action.payload.id && i.size === action.payload.size)),
      };
    case 'INCREMENT':
      return {
        items: state.items.map((i) =>
          i.id === action.payload.id && i.size === action.payload.size ? { ...i, qty: i.qty + 1 } : i,
        ),
      };
    case 'DECREMENT':
      return {
        items: state.items
          .map((i) =>
            i.id === action.payload.id && i.size === action.payload.size ? { ...i, qty: Math.max(1, i.qty - 1) } : i,
          )
          .filter((i) => i.qty > 0),
      };
    case 'SET_ITEMS':
      return { items: action.payload };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  increment: (id: string, size: string) => void;
  decrement: (id: string, size: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // load
  useEffect(() => {
    const data = localStorage.getItem('cart');
    if (data) dispatch({ type: 'SET_ITEMS', payload: JSON.parse(data) });
  }, []);

  // save
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (id: string, size: string) => dispatch({ type: 'REMOVE_ITEM', payload: { id, size } });
  const increment = (id: string, size: string) => dispatch({ type: 'INCREMENT', payload: { id, size } });
  const decrement = (id: string, size: string) => dispatch({ type: 'DECREMENT', payload: { id, size } });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total,
        addItem,
        removeItem,
        increment,
        decrement,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
