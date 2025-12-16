'use client';

import { X, CheckCircle } from 'lucide-react';

/* success modal */
export default function SuccessModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="animate-slideDown bg-beehealth-body-main relative w-full max-w-lg rounded-3xl border-2 border-green-500 p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="mb-6 flex items-center justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
        </div>

        <h2 className="mb-2 text-center text-3xl font-bold text-gray-900">¡Cita Confirmada!</h2>
        <p className="mb-6 text-center text-gray-600">Tu cita ha sido agendada exitosamente</p>

        <div className="bg-beehealth-body-main space-y-4 rounded-2xl p-6">
          <div className="border-b border-gray-200 pb-3">
            <p className="text-sm font-semibold text-gray-500 uppercase">Médico</p>
            <p className="text-lg font-bold text-gray-900">{data.doctor.nombre}</p>
            <p className="text-sm text-gray-600">{data.doctor.especialidad}</p>
          </div>

          <div className="border-b border-gray-200 pb-3">
            <p className="text-sm font-semibold text-gray-500 uppercase">Fecha</p>
            <p className="text-lg font-bold text-gray-900 capitalize">
              {data.date.toLocaleDateString('es-ES', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>

          <div className="border-b border-gray-200 pb-3">
            <p className="text-sm font-semibold text-gray-500 uppercase">Hora</p>
            <p className="text-2xl font-bold text-gray-900">{data.time}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase">Motivo</p>
            <p className="text-base text-gray-700">{data.reason}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-linear-to-r from-blue-600 to-indigo-700 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
        >
          Ok
        </button>
      </div>
    </div>
  );
}
