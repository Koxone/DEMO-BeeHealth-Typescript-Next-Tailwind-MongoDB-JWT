'use client';

import React from 'react';
import { Heart, Activity, Calendar, Apple, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

function HomeHeader({ setShowMenu, showMenu }) {
  const router = useRouter();
  return (
    <header className="bg-beehealth-body-main/80 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button onClick={() => router.push('/')} className="flex items-center gap-2">
          <img src="/fish.png" alt="" className="max-w-10" />
          <span className="text-xl font-bold text-gray-900 md:text-2xl">BeeHealth</span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={() => router.push('/about')}
            className="text-gray-600 transition hover:text-gray-900"
          >
            Acerca de
          </button>
          <button
            onClick={() => router.push('/contact')}
            className="text-gray-600 transition hover:text-gray-900"
          >
            Contacto
          </button>
          <button
            onClick={() => router.push('/auth/login')}
            className="px-4 py-2 font-medium text-blue-600 transition hover:text-blue-700"
          >
            Ingresar
          </button>
          <button
            onClick={() => router.push('/auth/signup')}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-sm transition hover:bg-blue-600"
          >
            Registrarse
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="rounded-lg p-2 transition hover:bg-gray-100 md:hidden"
        >
          {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="bg-beehealth-body-main border-t md:hidden">
          <div className="space-y-2 px-4 py-3">
            <button
              onClick={() => {
                setShowMenu(false);
                router.push('/about');
              }}
              className="hover:bg-beehealth-body-main w-full rounded-lg px-4 py-2 text-left text-gray-700 transition"
            >
              Acerca de
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                router.push('/contact');
              }}
              className="hover:bg-beehealth-body-main w-full rounded-lg px-4 py-2 text-left text-gray-700 transition"
            >
              Contacto
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                router.push('/auth/login');
              }}
              className="w-full rounded-lg px-4 py-2 font-medium text-blue-600 transition hover:bg-blue-50"
            >
              Ingresar
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                router.push('/signup');
              }}
              className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
            >
              Registrarse
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default HomeHeader;
