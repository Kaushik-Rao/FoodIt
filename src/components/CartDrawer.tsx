"use client";

import React, { useState } from "react";
import { useCartStore } from "@/utils/store";
import { ProductType } from "@/types/types";
import Image from "next/image";
import { toast } from "react-toastify";
import { X } from "lucide-react"; // Assuming lucide-react is available or can be added

const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { products, totalPrice, removeFromCart } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold text-red-500 uppercase">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Your cart is empty!</p>
              <button
                onClick={onClose}
                className="mt-4 text-red-500 font-semibold hover:underline"
              >
                Go to Menu
              </button>
            </div>
          ) : (
            products.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 ring-1 ring-gray-100 rounded-lg">
                <div className="relative w-20 h-20">
                  <Image src={item.img} alt={item.title} fill className="object-cover rounded-md" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.optionTitle || 'Standard'}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-red-500">₹{item.price}</span>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="text-xs text-gray-400 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600 font-medium">Total Amount</span>
            <span className="text-2xl font-bold text-red-600">₹{totalPrice.toFixed(1)}</span>
          </div>
          <button
            className="w-full bg-red-500 text-white py-4 rounded-xl font-bold uppercase hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
            onClick={() => {
              onClose();
              window.location.href = "/cart";
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
