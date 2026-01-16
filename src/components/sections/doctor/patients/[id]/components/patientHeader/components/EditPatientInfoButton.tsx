'use client';

import { Pencil } from 'lucide-react';

export default function EditPatientInfoButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-beehealth-green-secondary-dark hover:bg-beehealth-green-secondary-dark-hover relative flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-300"
    >
      {/* Normal state */}
      <span className="flex items-center gap-2 transition-all duration-300">
        <Pencil className="h-4 w-4" />
        Editar Paciente
      </span>
    </button>
  );
}
