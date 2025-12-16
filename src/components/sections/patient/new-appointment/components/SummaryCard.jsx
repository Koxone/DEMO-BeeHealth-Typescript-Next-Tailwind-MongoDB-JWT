'use client';

import { Sparkles, User, Calendar as CalendarIcon, Clock } from 'lucide-react';

/* summary */
export default function SummaryCard({ doctor, date, time }) {
  return (
    <div className="animate-slideDown bg-beehealth-blue-primary-solid border-beehealth-blue-primary-solid relative overflow-hidden rounded-2xl border-2 p-6 text-white shadow-2xl">
      <div className="bg-beehealth-body-main/10 absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full" />
      <div className="bg-beehealth-body-main/10 absolute bottom-0 left-0 -mb-12 -ml-12 h-24 w-24 rounded-full" />

      <div className="relative z-10">
        <div className="mb-6 flex items-center gap-3">
          <div className="bg-beehealth-body-main/20 rounded-lg p-2 backdrop-blur-sm">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold">Resumen de tu cita</h3>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-white/20 bg-black/20 p-4 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2">
              <User className="h-4 w-4 text-blue-200" />
              <span className="text-xs font-semibold tracking-wide text-blue-200 uppercase">
                Médico
              </span>
            </div>
            <p className="text-lg font-bold">{doctor?.nombre}</p>
            <p className="text-sm text-blue-100">{doctor?.especialidad}</p>
          </div>

          <div className="rounded-xl border border-white/20 bg-black/20 p-4 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-blue-200" />
              <span className="text-xs font-semibold tracking-wide text-blue-200 uppercase">
                Fecha
              </span>
            </div>
            <p className="text-lg font-bold capitalize">
              {date.toLocaleDateString('es-ES', { weekday: 'long' })}
            </p>
            <p className="text-sm text-blue-100">
              {date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="rounded-xl border border-white/20 bg-black/20 p-4 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-200" />
              <span className="text-xs font-semibold tracking-wide text-blue-200 uppercase">
                Hora
              </span>
            </div>
            <p className="text-3xl font-bold">{time}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
