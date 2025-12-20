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

export default function Sidebar({ role, specialty }) {
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
      </nav>
    </aside>
  );
}
