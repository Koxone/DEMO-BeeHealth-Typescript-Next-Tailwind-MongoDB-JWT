'use client';

import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

function HomeHeader({
  setShowMenu,
  showMenu,
  about = false,
  contact = false,
}: {
  setShowMenu: (show: boolean) => void;
  showMenu: boolean;
  about?: boolean;
  contact?: boolean;
}) {
  const router = useRouter();
  return (
    <header className="bg-beehealth-body-main/80 sticky top-0 z-50 border-b border-gray-300 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button onClick={() => router.push('/')} className="flex items-center gap-2">
          <img src="/fish.png" alt="" className="max-w-10" />
          <span className="text-xl font-bold text-gray-700 md:text-2xl">BeeHealth</span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-4 md:flex">
          {/* About Button */}
          {about && (
            <button
              onClick={() => router.push('/public/about')}
              className="text-gray-600 transition hover:text-gray-700"
            >
              Acerca de
            </button>
          )}

          {/* Contact Buttons */}
          {contact && (
            <button
              onClick={() => router.push('/public/contact')}
              className="text-gray-600 transition hover:text-gray-700"
            >
              Contacto
            </button>
          )}
          <button
            onClick={() => router.push('/auth/login')}
            className="text-beehealth-blue-primary-dark hover:text-beehealth-blue-primary-dark-hover px-4 py-2 font-medium transition"
          >
            Ingresar
          </button>
          <button
            onClick={() => router.push('/auth/signup')}
            className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover rounded-lg px-4 py-2 text-white shadow-sm transition"
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
        <div className="bg-beehealth-body-main border-t border-gray-300 md:hidden">
          <div className="space-y-2 px-4 py-3">
            {about && (
              <button
                onClick={() => {
                  setShowMenu(false);
                  router.push('/public/about');
                }}
                className="hover:bg-beehealth-body-main w-full rounded-lg px-4 py-2 text-left text-gray-700 transition"
              >
                Acerca de
              </button>
            )}

            {contact && (
              <button
                onClick={() => {
                  setShowMenu(false);
                  router.push('/public/contact');
                }}
                className="hover:bg-beehealth-body-main w-full rounded-lg px-4 py-2 text-left text-gray-700 transition"
              >
                Contacto
              </button>
            )}
            <button
              onClick={() => {
                setShowMenu(false);
                router.push('/auth/login');
              }}
              className="text-beehealth-blue-primary-dark w-full rounded-lg px-4 py-2 font-medium transition hover:bg-blue-50"
            >
              Ingresar
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                router.push('/auth/signup');
              }}
              className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover w-full rounded-lg px-4 py-2 text-white transition"
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
