"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AddressForm from "./AddressForm";

const CheckoutForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Payment Gateway Processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real app, you would call your backend here to verify payment
    // For this version, we simulate a successful transaction
    router.push("/success");
  };

  return (
    <form
      onSubmit={handlePayment}
      className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] p-4 lg:px-20 xl:px-40 flex flex-col gap-8"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-red-500 uppercase">Select Payment Method</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* UPI OPTION */}
          <div
            onClick={() => setPaymentMethod("upi")}
            className={`p-4 border-2 rounded-xl cursor-pointer transition-all flex flex-col items-center gap-3 ${paymentMethod === "upi" ? "border-red-500 bg-red-50" : "border-gray-200"}`}
          >
            <div className="w-12 h-12 relative">
              <Image src="/upi-logo.png" alt="UPI" fill className="object-contain" />
            </div>
            <span className={`font-bold ${paymentMethod === "upi" ? "text-red-500" : "text-gray-500"}`}>UPI / QR</span>
          </div>

          {/* CARD OPTION */}
          <div
            onClick={() => setPaymentMethod("card")}
            className={`p-4 border-2 rounded-xl cursor-pointer transition-all flex flex-col items-center gap-3 ${paymentMethod === "card" ? "border-red-500 bg-red-50" : "border-gray-200"}`}
          >
            <div className="w-12 h-12 relative">
              <Image src="/card-logo.png" alt="Card" fill className="object-contain" />
            </div>
            <span className={`font-bold ${paymentMethod === "card" ? "text-red-500" : "text-gray-500"}`}>Credit/Debit Card</span>
          </div>

          {/* NETBANKING OPTION */}
          <div
            onClick={() => setPaymentMethod("netbanking")}
            className={`p-4 border-2 rounded-xl cursor-pointer transition-all flex flex-col items-center gap-3 ${paymentMethod === "netbanking" ? "border-red-500 bg-red-50" : "border-gray-200"}`}
          >
            <div className="w-12 h-12 relative">
              <Image src="/bank-logo.png" alt="NetBanking" fill className="object-contain" />
            </div>
            <span className={`font-bold ${paymentMethod === "netbanking" ? "text-red-500" : "text-gray-500"}`}>Net Banking</span>
          </div>
        </div>
      </div>

      {/* DYNAMIC PAYMENT DETAILS */}
      <div className="p-6 ring-1 ring-red-200 rounded-xl bg-white shadow-sm flex flex-col items-center gap-6">
        {paymentMethod === "upi" && (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="p-4 bg-white ring-1 ring-gray-200 rounded-lg">
              {/* Placeholder QR Code */}
              <div className="w-48 h-48 bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                <span className="text-gray-400 text-sm">Scan QR to Pay</span>
              </div>
            </div>
            <p className="text-gray-600 font-medium">Scan the QR code using any UPI app (GPay, PhonePe, Paytm)</p>
          </div>
        )}

        {paymentMethod === "card" && (
          <div className="w-full flex flex-col gap-4 max-w-md">
            <input type="text" placeholder="Card Number" className="p-3 ring-1 ring-gray-300 rounded-md outline-none focus:ring-red-500" required />
            <div className="flex gap-4">
              <input type="text" placeholder="MM/YY" className="p-3 ring-1 ring-gray-300 rounded-md outline-none focus:ring-red-500 w-1/2" required />
              <input type="text" placeholder="CVV" className="p-3 ring-1 ring-gray-300 rounded-md outline-none focus:ring-red-500 w-1/2" required />
            </div>
          </div>
        )}

        {paymentMethod === "netbanking" && (
          <div className="w-full flex flex-col gap-4 max-w-md">
            <select className="p-3 ring-1 ring-gray-300 rounded-md outline-none focus:ring-red-500" required>
              <option value="">Select Your Bank</option>
              <option value="sbi">State Bank of India</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="axis">Axis Bank</option>
            </select>
          </div>
        )}
      </div>

      <AddressForm />

      <button
        disabled={isProcessing}
        className="bg-red-500 text-white p-4 rounded-md w-32 font-bold hover:bg-red-600 transition-colors"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </div>
        ) : (
          "Pay Now"
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;
