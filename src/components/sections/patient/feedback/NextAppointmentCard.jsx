'use client';

import { useGetMyAppointments } from '@/hooks/appointments/useGetMyAppointments';
import useAuthStore from '@/zustand/useAuthStore';
import { Calendar, Clock, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

export default function NextAppointmentCard() {
  const { user } = useAuthStore();
  const { appointments, loading, isError } = useGetMyAppointments(user?.id);

  // Get the most recently created appointment
  const latestAppointment = useMemo(() => {
    if (!appointments || appointments.length === 0) return null;

    // Sort by createdAt (most recent first) and get the first one
    const sorted = [...appointments].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return sorted[0];
  }, [appointments]);

  // Loading state
  if (loading) {
    return (
      <div className="group relative overflow-hidden rounded-3xl border-2 border-gray-200 bg-linear-to-br from-gray-50 to-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 animate-pulse rounded-2xl bg-gray-300" />
          <div className="space-y-2">
            <div className="h-6 w-32 animate-pulse rounded bg-gray-300" />
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  // No appointment state
  if (!latestAppointment) {
    return (
      <div className="group relative overflow-hidden rounded-3xl border-2 border-gray-200 bg-linear-to-br from-gray-50 to-gray-100 p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gray-200 p-3">
              <Calendar className="h-6 w-6 text-gray-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-400 lg:text-3xl">Sin citas</p>
              <p className="text-sm text-gray-500">No hay próximas consultas</p>
            </div>
          </div>
          <Link
            href="/patient/new-appointment"
            className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-red-600"
          >
            Agendar Cita
          </Link>
        </div>
      </div>
    );
  }

  // Calculate days until appointment
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const appointmentDate = new Date(latestAppointment.date);
  appointmentDate.setHours(0, 0, 0, 0);
  const diffTime = appointmentDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const getSpecialtyLabel = (specialty) => {
    const labels = {
      weight: 'Control de Peso',
      dental: 'Odontología',
      aesthetic: 'Estética',
    };
    return labels[specialty] || specialty;
  };

  const getSpecialtyColor = (specialty) => {
    const colors = {
      weight: 'from-blue-400 to-blue-600',
      dental: 'from-teal-400 to-teal-600',
      aesthetic: 'from-pink-400 to-pink-600',
    };
    return colors[specialty] || 'from-purple-400 to-purple-600';
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border-2 border-purple-200 bg-linear-to-br ${getSpecialtyColor(latestAppointment.specialty)} p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
    >
      {/* Decorative circles */}
      <div className="pointer-events-none absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 -mb-8 -ml-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

      <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left side - Main info */}
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
            <Calendar className="h-6 w-6 text-white lg:h-7 lg:w-7" />
          </div>
          <div>
            <p className="text-sm text-white/90">Faltan</p>
            <p className="text-2xl font-bold text-white lg:text-3xl">
              {diffDays === 0
                ? 'Hoy'
                : diffDays > 0
                  ? `${diffDays} ${diffDays === 1 ? 'día' : 'días'}`
                  : 'Cita pasada'}
            </p>
            <p className="text-sm text-white/90">
              {diffDays === 0
                ? 'Tu cita es hoy'
                : diffDays > 0
                  ? 'Para tu próxima consulta'
                  : 'Cita completada'}
            </p>
          </div>
        </div>

        {/* Right side - Time & Specialty */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 backdrop-blur-sm">
            <Clock className="h-4 w-4 text-white" />
            <span className="text-sm font-bold text-white lg:text-base">
              {latestAppointment.time}
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 backdrop-blur-sm">
            <Stethoscope className="h-4 w-4 text-white" />
            <span className="text-xs font-semibold text-white lg:text-sm">
              {getSpecialtyLabel(latestAppointment.specialty)}
            </span>
          </div>
        </div>
      </div>

      {/* Date display at bottom */}
      <div className="relative z-10 mt-4 border-t border-white/20 pt-4">
        <p className="text-center text-xs font-medium text-white/80 lg:text-sm">
          {formatDate(latestAppointment.date)}
        </p>
      </div>
    </div>
  );
}
