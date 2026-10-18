"use client";
import React from "react";

const AddressForm = () => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-800 uppercase">Delivery Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="House No / Flat No"
          className="p-3 ring-1 ring-gray-300 rounded-md outline-none focus:ring-red-500"
          required
        />
        <input
          type="text"
          placeholder="Street / Area"
          className="p-3 ring-1 ring-gray-300 rounded-md outline-none focus:ring-red-500"
          required
        />
        <input
          type="text"
          placeholder="Landmark"
          className="p-3 ring-1 ring-gray-300 rounded-md outline-none focus:ring-red-500"
        />
        <input
          type="text"
          placeholder="City"
          className="p-3 ring-1 ring-gray-300 rounded-md outline-none focus:ring-red-500"
          required
        />
        <input
          type="text"
          placeholder="State"
          className="p-3 ring-1 ring-gray-300 rounded-md outline-none focus:ring-red-500"
          required
        />
        <input
          type="text"
          placeholder="Pincode"
          className="p-3 ring-1 ring-gray-300 rounded-md outline-none focus:ring-red-500"
          required
        />
      </div>
    </div>
  );
};

export default AddressForm;
