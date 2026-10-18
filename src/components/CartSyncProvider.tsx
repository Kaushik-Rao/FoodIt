"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useCartStore } from "@/utils/store";
import { toast } from "react-toastify";

export default function CartSyncProvider() {

  const { data: session } = useSession();
  const { syncCart } = useCartStore();

  useEffect(() => {
    const syncWithDb = async () => {
      if (session?.user) {
        try {
          const response = await fetch("/api/cart");
          if (response.ok) {
            const dbItems = await response.json();
            syncCart(dbItems);
            toast.info("Cart synchronized with your account!");
          }
        } catch (error) {
          console.error("Cart sync failed:", error);
        }
      }
    };

    syncWithDb();
  }, [session, syncCart]);

  return null; // This is a logic-only component
}
