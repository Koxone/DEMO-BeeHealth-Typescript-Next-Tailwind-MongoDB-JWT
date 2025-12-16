import { useRouter } from 'next/navigation';
import React from 'react';

export default function PatientStatsCard({
  role,
  Icon,
  mainData,
  title,
  href,
  extraData,
  variant = 'primary',
  lastVisitCount,
  count,
}) {
  const router = useRouter();
  const styles = {
    primary: 'bg-beehealth-blue-primary-solid  text-white border-transparent',
    success:
      'border border-gray-200 bg-beehealth-body-main text-gray-900 hover:border-green-300 active:scale-95',
    purple:
      'border border-gray-200 bg-beehealth-body-main text-gray-900 hover:border-purple-300 active:scale-95',
    danger: 'border-2 border-red-200 bg-red-50 text-gray-900 hover:border-red-300 active:scale-95',
  };

  const textColors = {
    primary: 'text-white',
    success: 'text-gray-600',
    purple: 'text-gray-600',
    danger: 'text-gray-600',
  };

  const badgeColors = {
    primary: 'bg-beehealth-body-main/20 text-white',
    success: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    danger: 'bg-red-100 text-red-700',
  };

  const iconColors = {
    primary: 'text-white opacity-80',
    success: 'text-green-500',
    purple: 'text-purple-500',
    danger: 'text-red-500 animate-bounce',
  };

  return (
    <div
      onClick={() => router.push(`${href || '#'}`)}
      className={`cursor-pointer rounded-xl p-4 shadow-sm transition-all duration-300 hover:shadow-md md:p-6 ${styles[variant]}`}
    >
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex w-full items-center justify-between">
          <Icon className={`h-8 w-8 ${iconColors[variant]}`} />

          {count && (
            <button className="bg-beehealth-red-primary-solid hover:bg-beehealth-red-primary-solid-hover rounded-lg px-4 py-2 text-sm font-medium text-white transition active:scale-95">
              Agendar Cita
            </button>
          )}
        </div>
        {extraData && (
          <span className={`rounded px-2 py-1 text-xs font-medium ${badgeColors[variant]}`}>
            {extraData}
          </span>
        )}
      </div>

      {/* Main data */}
      <p className={`mb-1 text-2xl font-bold md:text-3xl ${textColors[variant]}`}>{mainData}</p>

      {/* Title */}
      <p className={`text-xs md:text-sm ${textColors[variant]}`}>{title}</p>
    </div>
  );
}
