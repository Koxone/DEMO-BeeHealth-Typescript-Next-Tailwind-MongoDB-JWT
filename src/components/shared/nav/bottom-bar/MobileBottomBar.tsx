'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  patientSidebarItems,
  weightControlSidebarItems,
  employeeSidebarItems,
  dentalSidebarItems,
} from '../sidebar/components/SideBarData';

// Custom Hooks
import { useGetCurrentUser } from '@/@hooks/users/useGetCurrentUser';

function MobileBottomBar() {
  // Get current user
  const {
    user: currentUser,
    isLoading: isLoadingCurrentUser,
    refetch: refetchCurrentUser,
  } = useGetCurrentUser();
  const role = currentUser?.role;
  const specialty = currentUser?.specialty;

  const pathname = usePathname();
  const router = useRouter();

  // Sidebar Options
  const sidebarOptions =
    pathname.startsWith('/doctor') && role === 'doctor' && specialty === 'dental'
      ? dentalSidebarItems
      : pathname.startsWith('/doctor') && role === 'doctor' && specialty === 'weight'
        ? weightControlSidebarItems
        : pathname.startsWith('/patient') && role === 'patient'
          ? patientSidebarItems
          : employeeSidebarItems;

  if (pathname === '/auth/login') return null;
  return (
    <nav className="safe-area-inset-bottom bg-beehealth-body-main/95 fixed right-0 bottom-0 left-0 z-50 border-t-2 border-gray-200 shadow-2xl backdrop-blur-lg md:hidden">
      <div className="grid grid-cols-5 gap-1 px-2 py-2">
        {sidebarOptions.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.path);

          return (
            <button
              key={item.path}
              onClick={() => router.push(`${item.path}`)}
              className={`relative flex flex-col items-center justify-center rounded-xl px-1 py-2 transition-all duration-200 active:scale-95 ${
                isActive ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              {/* Active background */}
              {isActive && (
                <div className="bg-beehealth-blue-primary-solid animate-fadeIn absolute inset-0 rounded-xl" />
              )}

              {/* Icon Container */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <Icon
                  className={`h-5 w-5 transition-all duration-200 ${
                    isActive ? 'text-white' : 'text-gray-600'
                  }`}
                />
                {/* Label */}
                <span
                  className={`text-[10px] font-semibold transition-all duration-200 ${
                    isActive ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </span>
              </div>

              {/* Active indicator bar */}
              {isActive && (
                <div className="bg-beehealth-green-secondary-solid absolute -top-1.5 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-b-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileBottomBar;
