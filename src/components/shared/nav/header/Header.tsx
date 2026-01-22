'use client';

import { Megaphone } from 'lucide-react';
import { useState } from 'react';
import ProfileButton from './components/ProfileButton';
import MobileMenu from './components/MobileMenu';
import LogoutButton from './components/LogoutButton';
import Link from 'next/link';

// Custom Hooks
import { useGetCurrentUser } from '@/@hooks/users/useGetCurrentUser';

// Custom Hooks
import { useGetMassiveNotifications } from '@/@hooks/notifications/useGetMassiveNotifications';

export default function Header() {
  // Get current user
  const {
    user: currentUser,
    isLoading: isLoadingCurrentUser,
    refetch: refetchCurrentUser,
  } = useGetCurrentUser();

  // Massive notifications
  const {
    data: massiveNotifications,
    isLoading: massiveLoading,
    error: massiveError,
  } = useGetMassiveNotifications(currentUser?.role);

  const newNotifications = massiveNotifications?.filter(
    (notification) =>
      notification?.readBy?.includes(currentUser?.id) === false && notification?.isActive === true
  );

  const [isOpen, setIsOpen] = useState(false);

  // Fallbacks
  const role = currentUser?.role || 'guest';
  const fullName = currentUser?.fullName || 'Usuario';

  // Translate role
  let roleLabel = 'Invitado';
  if (role === 'doctor') roleLabel = 'Médico';
  else if (role === 'patient') roleLabel = 'Paciente';
  else if (role === 'employee') roleLabel = 'Empleado';

  return (
    <header className="bg-beehealth-body-main sticky top-0 z-40 border-b-2 border-gray-200 shadow-lg backdrop-blur-lg">
      {/* Desktop header */}
      <div className="hidden items-center justify-between px-6 py-4 md:flex">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img src="/fish.png" alt="" className="max-w-10" />
          <div>
            <h2 className="text-beehealth-logo-text text-2xl font-bold tracking-tight">
              BeeHealth
            </h2>
            <p className="text-sm font-medium text-gray-500">Panel de {roleLabel}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Announcements Button */}
          <Link
            href={`/${role}/announcements`}
            className="group relative rounded-xl border-2 border-gray-300 p-3 transition-all duration-200 hover:border-blue-200 hover:bg-linear-to-br hover:from-blue-50 hover:to-indigo-50 active:scale-95"
          >
            <Megaphone className="h-5 w-5 text-gray-600 transition-colors duration-200 group-hover:text-blue-600" />
            {newNotifications?.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-r from-red-500 to-rose-600 text-xs font-bold text-white shadow-lg">
                {newNotifications?.length > 0 ? newNotifications?.length : 0}
              </span>
            )}
          </Link>

          <div className="flex items-center gap-3 border-l-2 border-gray-200 pl-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-700">{fullName}</p>
              <div className="flex items-center justify-start gap-1.5">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                <p className="text-xs font-medium text-gray-500">{roleLabel}</p>
              </div>
            </div>
            <ProfileButton currentUser={currentUser} />
          </div>

          {/* Logout */}
          <LogoutButton />
        </div>
      </div>

      {/* Mobile header */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg">
            <ProfileButton currentUser={currentUser} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">{fullName}</p>
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-medium text-gray-500">{roleLabel}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Announcements Button */}
          <Link
            href={`/${role}/announcements`}
            className="group relative rounded-xl border-2 border-transparent p-3 transition-all duration-200 hover:border-blue-200 hover:bg-linear-to-br hover:from-blue-50 hover:to-indigo-50 active:scale-95"
          >
            <Megaphone className="h-5 w-5 text-gray-600 transition-colors duration-200 group-hover:text-blue-600" />
            {newNotifications?.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-r from-red-500 to-rose-600 text-xs font-bold text-white shadow-lg">
                {newNotifications?.length > 0 ? newNotifications?.length : 0}
              </span>
            )}
          </Link>

          {/* <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl p-2 transition-all duration-200 hover:bg-gray-100 active:scale-95"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button> */}
          <LogoutButton />
        </div>
      </div>

      {isOpen && <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
    </header>
  );
}
