'use client';

import { ChevronRight } from 'lucide-react';
import {
  patientSidebarItems,
  weightControlSidebarItems,
  employeeSidebarItems,
  dentalSidebarItems,
} from './components/SideBarData';
import { usePathname, useRouter } from 'next/navigation';
import NextAppointmentCard from '@/components/sections/patient/feedback/NextAppointmentCard';

export default function Sidebar({ role, currentUser, specialty }) {
  // Custom Hooks
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
    <>
      {/* Desktop sidebar */}
      <aside className="hidden min-h-screen w-72 flex-col border-r-2 border-gray-200 shadow-xl md:flex">
        <nav className="flex h-full flex-col space-y-1 overflow-y-auto p-4">
          {/* Buttons */}
          {sidebarOptions.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.path);

            return (
              <button
                key={item.path}
                onClick={() => router.push(`${item.path}`)}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`group animate-fadeInLeft relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-xl px-4 py-3.5 ${
                  isActive
                    ? 'border-beehealth-green-primary-light text-beehealth-green-primary-solid scale-105 border font-semibold shadow-md'
                    : 'hover:bg-beehealth-body-main border-2 border-transparent text-gray-700 hover:scale-105 hover:shadow-md active:scale-95'
                }`}
              >
                {/* Active background */}
                {isActive && (
                  <div className="from-beehealth-green-primary-dark/30 to-beehealth-green-primary-dark-hover/30 absolute inset-0 animate-pulse bg-linear-to-r" />
                )}

                {/* Icon and label */}
                <div className="relative z-10 flex flex-1 items-center gap-3">
                  <div
                    className={`rounded-lg p-2 transition-all duration-200 ${
                      isActive
                        ? 'bg-beehealth-green-primary-dark shadow-lg'
                        : 'bg-gray-100 group-hover:scale-110 group-hover:bg-blue-100'
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        isActive
                          ? 'text-white'
                          : 'group-hover:text-beehealth-green-primary-solid text-gray-600'
                      }`}
                    />
                  </div>
                  <span className="text-sm">{item.label}</span>
                </div>

                {/* Chevron */}
                {isActive && (
                  <ChevronRight className="text-beehealth-green-primary-solid relative z-10 h-4 w-4 animate-pulse" />
                )}

                {/* Decorative Bar */}
                {isActive && (
                  <div className="from-beehealth-green-primary-dark-hover to-beehealth-green-primary-dark absolute top-0 bottom-0 left-0 w-1.5 rounded-r-full bg-linear-to-b" />
                )}
              </button>
            );
          })}

          {role === 'patient' && (
            <div className="mt-10 pt-4">
              <NextAppointmentCard appointment={currentUser?.nextAppointment} />
            </div>
          )}
        </nav>
      </aside>

      {/* Mobile navigation */}
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
    </>
  );
}
