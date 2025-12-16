'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) router.push('/auth/login');
      else console.error('Error al cerrar sesión');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="group rounded-xl border-2 border-transparent p-3 transition-all duration-200 hover:border-red-200 hover:bg-red-50 active:scale-95"
    >
      <LogOut className="h-5 w-5 text-gray-600 transition-colors duration-200 group-hover:text-red-600" />
    </button>
  );
}
