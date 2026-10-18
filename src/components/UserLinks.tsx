"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserLinks = () => {
  const { status } = useSession();
  return (
    <div>
      {status === "authenticated" ? (
        <div className="flex items-center gap-4">
          <Link href="/account" className="hover:text-red-700 transition-colors">Account</Link>
          <Link href="/orders" className="hover:text-red-700 transition-colors">Orders</Link>
          <span className="ml-4 cursor-pointer hover:text-red-700 transition-colors" onClick={() => signOut()}>
            Logout
          </span>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};

export default UserLinks;
