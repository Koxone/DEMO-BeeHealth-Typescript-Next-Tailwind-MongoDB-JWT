'use client';

import { ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';

/* header */
export default function HeaderBar({ onBack }) {
  return (
    <div className="-mx-4 -mt-4 mb-6 px-4 pt-6 pb-8 md:rounded-2xl">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start gap-4">
          <div className="bg-beehealth-blue-primary-solid rounded-2xl p-3 shadow-lg">
            <CalendarIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Agendar Nueva Cita
            </h1>
            <p className="text-base text-gray-600 md:text-lg">
              Sigue los pasos para programar tu consulta médica
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
