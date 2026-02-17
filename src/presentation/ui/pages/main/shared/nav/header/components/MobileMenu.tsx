'use client';

import { useState } from 'react';
import { Menu, X, Home, Calendar, Users, FileText, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { useRouter } from 'next/navigation';
import { useModalClose } from '@/presentation/hooks/shared';

export default function MobileMenu({ isOpen, setIsOpen }) {
  const router = useRouter();

  const { handleOverlayClick } = useModalClose(() => setIsOpen(false));

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
    <nav>
      {isOpen && (
        <div className="fixed top-18 right-0 z-50 w-64 rounded-l-2xl bg-white shadow-2xl">
          <nav className="space-y-2 p-4">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <Home className="h-5 w-5" />
              Inicio
            </Link>
            <Link
              href="/appointments"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <Calendar className="h-5 w-5" />
              Citas
            </Link>
            <Link
              href="/patients"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <Users className="h-5 w-5" />
              Pacientes
            </Link>
            <Link
              href="/records"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <FileText className="h-5 w-5" />
              Historial
            </Link>
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <Settings className="h-5 w-5" />
              Configuración
            </Link>

            {/* Logout */}
            <div
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <LogOut className="h-5 w-5" />
              Cerrar Sesión
            </div>
          </nav>
        </div>
      )}
    </nav>
  );
}
