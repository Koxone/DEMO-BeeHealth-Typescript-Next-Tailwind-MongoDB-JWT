'use client';

import { Calendar, Clock, Phone, Mail, Sparkles } from 'lucide-react';

export default function AppointmentCard({ index, cita, getEstadoBadge }) {
  return (
    <div
      style={{ animationDelay: `${index * 50}ms` }}
      className={`group animate-fadeInUp bg-beehealth-body-main relative overflow-hidden rounded-2xl border-2 p-5 transition-all duration-300 hover:shadow-xl ${
        cita.estado === 'Cancelada'
          ? 'bg-beehealth-body-main border-rose-200 opacity-75'
          : 'hover:border-beehealth-blue-primary-dark border-gray-200 hover:scale-[1.01]'
      }`}
    >
      <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          {/* Avatar */}
          <div
            className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl font-bold text-white shadow-lg transition-all duration-300 ${
              cita.estado === 'Cancelada'
                ? 'bg-linear-to-br from-gray-300 to-gray-400'
                : 'bg-beehealth-blue-primary-solid group-hover:scale-110 group-hover:shadow-xl'
            }`}
          >
            {cita.avatar}
          </div>

          {/* info */}
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              <h3 className="truncate text-lg font-bold text-gray-700">{cita.paciente}</h3>
            </div>

            <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="bg-beehealth-blue-primary-solid flex items-center gap-2 rounded-lg px-3 py-1.5">
                <Calendar className="h-4 w-4 shrink-0 text-white" />
                <span className="text-sm font-semibold text-white">{cita.fecha}</span>
              </div>
              <div className="bg-beehealth-blue-primary-solid flex items-center gap-2 rounded-lg px-3 py-1.5">
                <Clock className="h-4 w-4 shrink-0 text-white" />
                <span className="text-sm font-semibold text-white">{cita.hora}</span>
              </div>
              <div className="bg-beehealth-blue-primary-solid flex items-center gap-2 rounded-lg px-3 py-1.5">
                <Phone className="h-4 w-4 shrink-0 text-white" />
                <span className="text-sm font-medium text-white">{cita.telefono}</span>
              </div>
              <div className="bg-beehealth-blue-primary-solid flex min-w-0 items-center gap-2 rounded-lg px-3 py-1.5">
                <Mail className="h-4 w-4 shrink-0 text-white" />
                <span className="truncate text-sm font-medium text-white">{cita.email}</span>
              </div>
            </div>

            <div className="rounded-lg border border-indigo-200 bg-linear-to-r from-indigo-50 to-purple-50 p-3">
              <div className="flex items-start gap-2">
                <div>
                  <p className="mb-1 text-xs font-semibold text-indigo-900">Motivo de consulta</p>
                  <p className="text-sm font-medium text-black">{String(cita.motivo ?? '')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {cita.estado !== 'Cancelada' && (
        <div className="bg-beehealth-blue-primary-solid absolute right-0 bottom-0 left-0 h-1 opacity-0 transition-all duration-300 group-hover:opacity-100" />
      )}
    </div>
  );
}
