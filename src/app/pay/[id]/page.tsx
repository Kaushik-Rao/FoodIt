"use client";
import React from "react";
import CheckoutForm from "@/components/CheckoutForm";

const PayPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="min-h-screen bg-fuchsia-50">
      <CheckoutForm />
    </div>
  );
};

export default PayPage;
