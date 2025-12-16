'use client';

import { useState } from 'react';
import { Users, ChevronRight, CheckCircle } from 'lucide-react';
import PatientsAssignedModal from './PatientsAssignedModal';

export default function PatientsAssignedCompact({ patients }) {
  // Internal state
  const [open, setOpen] = useState(false);
  const list = patients || [];

  // Control how many patients to show in preview
  const preview = list.slice(0, 2);

  return (
    <>
      {/* Compact Card */}
      <div className="bg-beehealth-body-main flex flex-col rounded-lg border border-gray-200 p-4">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <h2 className="text-sm font-semibold text-gray-900">Pacientes asignados</h2>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
          >
            Ver todos ({list.length})
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Empty state */}
        {list.length === 0 && (
          <p className="bg-beehealth-body-main rounded-md border border-gray-200 p-3 text-sm text-gray-600">
            Esta dieta no está asignada a ningún paciente.
          </p>
        )}

        {/* Preview of patients */}
        {list.length > 0 && (
          <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
            {preview.map((item) => (
              <li key={item.patient._id} className="flex items-center gap-3 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>

                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-gray-900">{item.patient.fullName}</p>
                  <p className="text-xs text-gray-500">{item.patient.email}</p>
                </div>
              </li>
            ))}

            {list.length > 3 && (
              <li className="p-3 text-center text-sm text-blue-600">+{list.length - 3} más</li>
            )}
          </ul>
        )}
      </div>

      {/* Modal with full list */}
      {open && <PatientsAssignedModal patients={list} onClose={() => setOpen(false)} />}
    </>
  );
}
