"use client";
import { useSession } from 'next-auth/react'
import LogoutButton from '@/components/LogoutButton'

export default function AuthLogoutSection() {
  const { status } = useSession();

  if (status !== 'authenticated') return null;

  return (
    <div className="flex justify-center py-8 bg-white">
       <LogoutButton />
    </div>
  );
}
