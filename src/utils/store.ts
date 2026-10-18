import { ActionTypes, CartType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart(item) {
        const products = get().products;
        const productInState = products.find(
          (product) => product.id === item.id
        );

        if (productInState) {
          const updatedProducts = products.map((product) =>
            product.id === productInState.id
              ? {
                  ...item,
                  quantity: item.quantity + product.quantity,
                  price: item.price + product.price,
                }
              : item
          );
          set((state) => ({
            products: updatedProducts,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        } else {
          set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        }
      },
      removeFromCart(item) {
        set((state) => ({
          products: state.products.filter((product) => product.id !== item.id),
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - item.price,
        }));
      },
      // New action to sync cart with database
      syncCart(dbItems: any[]) {
        const localProducts = get().products;

        // Merge local guest cart with DB cart
        const mergedProductsMap = new Map();

        // Add DB items first
        dbItems.forEach(item => {
          mergedProductsMap.set(item.id, item);
        });

        // Merge local items
        localProducts.forEach(item => {
          if (mergedProductsMap.has(item.id)) {
            const dbItem = mergedProductsMap.get(item.id);
            mergedProductsMap.set(item.id, {
              ...item,
              quantity: (dbItem as any).quantity + item.quantity,
              price: (dbItem as any).price + item.price,
            });
          } else {
            mergedProductsMap.set(item.id, item);
          }
        });

        const finalProducts = Array.from(mergedProductsMap.values());

        set({
          products: finalProducts,
          totalItems: finalProducts.reduce((acc, item) => acc + item.quantity, 0),
          totalPrice: finalProducts.reduce((acc, item) => acc + item.price, 0),
        });
      },
    }),
    { name: "cart", skipHydration: true }
  )
);
