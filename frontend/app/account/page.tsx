'use client';

import { useSession, signOut } from 'next-auth/react';

export default function DashboardPage() {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" }); // redirect ke login setelah logout
  };

  return (
    <div className="p-6 text-white bg-slate-900 h-screen">
      <h1 className="text-xl font-bold">PRESSOC</h1>
      <p className="mt-4">Profile Account</p>

      <div className="mt-4 p-4 bg-slate-800 rounded">
        <div className="flex items-center gap-2">
          <span>👤</span>
          <span>{session?.user?.name || session?.user?.name || 'Tidak diketahui'}</span>
        </div>
      </div>

      <button 
        onClick={handleLogout} 
        className="mt-4 text-red-500 hover:underline"
      >
        🚪 Log out
      </button>
    </div>
  );
}
