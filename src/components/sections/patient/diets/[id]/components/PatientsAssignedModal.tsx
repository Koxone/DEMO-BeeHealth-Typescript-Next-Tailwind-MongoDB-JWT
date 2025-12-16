/* Block comment: Modal for showing all assigned patients */

'use client';

import { X, Clock, CheckCircle } from 'lucide-react';
import { useModalClose } from '@/hooks/useModalClose';

export default function PatientsAssignedModal({ patients, onClose }) {
  /* Block comment: Close handler */
  const { handleOverlayClick } = useModalClose(onClose);

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      {/* Modal container */}
      <div
        className="bg-beehealth-body-main relative w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-linear-to-br from-blue-300 to-blue-500 opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-linear-to-tr from-blue-300 to-blue-500 opacity-20 blur-3xl" />

        {/* Header */}
        <div className="bg-beehealth-body-main/80 relative overflow-hidden border-b border-gray-100 backdrop-blur-xl">
          <div className="absolute inset-0 bg-linear-to-r from-blue-200 to-blue-300 opacity-10" />
          <div className="relative px-6 py-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="relative">
                  <div className="relative flex items-center justify-center rounded-2xl bg-linear-to-br from-blue-400 to-blue-600 p-3 shadow-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Pacientes asignados</h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Lista completa de pacientes vinculados a esta dieta
                  </p>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="rounded-xl bg-gray-100 p-2 transition-all hover:bg-red-500"
              >
                <X className="h-5 w-5 text-gray-600 hover:text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-180px)] overflow-y-auto p-6">
          <ul className="divide-y divide-gray-100">
            {patients.map((item) => (
              <li key={item.patient._id} className="flex items-center gap-3 p-4">
                {/* Status icon */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>

                {/* Patient info */}
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-gray-900">{item.patient.fullName}</p>

                  <p className="text-xs text-gray-500">{item.patient.email}</p>

                  {/* Assigned date */}
                  <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>
                      {new Date(item.assignedAt).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Current status */}
                  <span
                    className={`mt-1 w-fit rounded-full px-2 py-0.5 text-xs ${
                      item.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {item.isActive ? 'Activo' : 'Finalizado'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t p-3">
          <button
            onClick={onClose}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
