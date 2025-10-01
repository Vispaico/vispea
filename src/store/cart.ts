"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  productId: number;
  productName: string;
  variantId: number;
  variantName: string;
  price: number;
  currency: string;
  quantity: number;
  image?: string | null;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantId: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find((cartItem) => cartItem.variantId === item.variantId);
        if (existing) {
          set({
            items: get().items.map((cartItem) =>
              cartItem.variantId === item.variantId
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem,
            ),
          });
          return;
        }

        set({ items: [...get().items, item] });
      },
      removeItem: (variantId) => {
        set({ items: get().items.filter((item) => item.variantId !== variantId) });
      },
      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((item) => item.variantId !== variantId) });
          return;
        }

        set({
          items: get().items.map((item) =>
            item.variantId === variantId ? { ...item, quantity } : item,
          ),
        });
      },
      clear: () => set({ items: [] }),
    }),
    {
      name: "vispea-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export const calculateCartTotals = (items: CartItem[]) => {
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const currency = items[0]?.currency ?? "USD";

  return {
    totalQuantity,
    totalAmount,
    currency,
  };
};

export const selectCartTotals = (state: CartStore) => calculateCartTotals(state.items);
