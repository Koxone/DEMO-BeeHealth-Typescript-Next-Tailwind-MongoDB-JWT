'use client';

import { AlertCircle, Clock, FileText, User } from 'lucide-react';

export default function CancelAppointmentModal() {
  return (
    <>
      <div className="animate-fadeIn fixed inset-0 z-50 bg-black/50" />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="animate-slideUp bg-beehealth-body-main pointer-events-auto w-full max-w-md rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-100 p-2">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Cancelar Cita</h2>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="mb-4 text-gray-700">¿Estás seguro de que deseas cancelar esta cita?</p>

            <div className="bg-beehealth-body-main mb-6 space-y-2 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-600" />
                <p className="text-sm font-medium text-gray-900">Juan Pérez</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-600" />
                <p className="text-sm text-gray-700">09:00</p>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-600" />
                <p className="text-sm text-gray-700">Primera Consulta</p>
              </div>
            </div>

            <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
              <p className="text-sm text-yellow-800">
                <strong>Nota:</strong> El paciente será notificado de la cancelación.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="hover:bg-beehealth-body-main flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition active:scale-95">
                Mantener cita
              </button>
              <button className="flex-1 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600 active:scale-95">
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
