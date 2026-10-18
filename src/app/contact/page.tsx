"use client";
import React from "react";

const ContactPage = () => {
  return (
    <div className="p-4 lg:px-20 xl:px-40 min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold my-8 text-red-500 uppercase">Contact Us</h1>
      <p className="text-gray-600 max-w-2xl mb-8">
        Have questions or feedback? We'd love to hear from you.
        Reach out to us via phone or email, and our team will get back to you as soon as possible.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="p-8 ring-1 ring-red-200 rounded-xl bg-white shadow-sm flex flex-col items-center gap-4">
          <span className="text-3xl">📞</span>
          <h3 className="text-xl font-semibold">Call Us</h3>
          <p className="text-red-500 font-bold">+91 9014706457</p>
        </div>
        <div className="p-8 ring-1 ring-red-200 rounded-xl bg-white shadow-sm flex flex-col items-center gap-4">
          <span className="text-3xl">📧</span>
          <h3 className="text-xl font-semibold">Email Us</h3>
          <p className="text-red-500 font-bold">support@foodit.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
