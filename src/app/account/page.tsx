import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const AccountPage = () => {
  const { data: session } = useSession();

  return (
    <div className="p-4 lg:px-20 xl:px-40 min-h-screen">
      <h1 className="text-3xl font-bold my-8">My Account</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center p-6 ring-1 ring-red-200 rounded-xl bg-white shadow-sm w-full md:w-1/3">
          <div className="relative w-32 h-32 mb-4">
            <Image
              src={session?.user?.image || "/default-avatar.png"}
              alt="User Avatar"
              fill
              className="rounded-full object-cover border-4 border-red-500"
            />
          </div>
          <h2 className="text-xl font-semibold">{session?.user?.name}</h2>
          <p className="text-gray-500">{session?.user?.email}</p>
          <button
            onClick={() => signOut()}
            className="mt-6 uppercase w-full bg-gray-200 text-gray-700 p-3 rounded-md hover:bg-gray-300 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <div className="p-6 ring-1 ring-red-200 rounded-xl bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-3">
              <Link
                href="/orders"
                className="p-3 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors font-medium"
              >
                📦 View My Order History
              </Link>
              <Link
                href="/menu"
                className="p-3 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors font-medium"
              >
                🍔 Order More Food
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
