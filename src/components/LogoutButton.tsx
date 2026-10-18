"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // Simulate a small delay for the "Please wait" experience
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="uppercase bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors font-bold"
      >
        Logout
      </button>

      {/* CONFIRMATION DIALOG */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full mx-4 text-center animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Are you sure?</h2>
            <p className="text-gray-600 mb-8">You will be logged out of your account. Are you sure you want to proceed?</p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Please wait...
                  </>
                ) : (
                  "Yes, Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
