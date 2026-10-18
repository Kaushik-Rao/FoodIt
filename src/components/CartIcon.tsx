"use client";

import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CartDrawer from "./CartDrawer";

const CartIcon = () => {
  const { data: session } = useSession();
  const { totalItems } = useCartStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex items-center gap-4">
      {session?.user?.isAdmin ? (
        <Link href="/add">
          <button className="p-1 bg-red-500 text-white rounded-md uppercase text-xs">
            Add product
          </button>
        </Link>
      ) : (
        <div
          className="flex items-center gap-2 cursor-pointer hover:text-red-700 transition-colors"
          onClick={() => setIsDrawerOpen(true)}
        >
          <div className="relative w-6 h-6 md:w-5 md:h-5">
            <Image
              src="/cart.png"
              alt="Cart"
              fill
              sizes="100%"
              className="object-contain"
            />
          </div>
          <span className="font-medium">Cart ({totalItems})</span>
        </div>
      )}
      <CartDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};

export default CartIcon;
