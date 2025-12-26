'use client';

import { FileText } from 'lucide-react';

export default function ReasonField({ value, onChange }) {
  return (
    <div className="animate-slideDown bg-beehealth-body-main rounded-2xl border-2 border-gray-200 p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-indigo-100 p-2">
          <FileText className="text-beehealth-blue-primary-dark h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-700">Motivo de la consulta</h2>
          <p className="text-sm text-gray-600">Describe brevemente tu motivo de consulta</p>
        </div>
      </div>

      <textarea
        maxLength={250}
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 transition-all duration-200 outline-none"
        placeholder="Ej: Revisión de rutina, control de glucosa, consulta sobre alimentación..."
      />
    </div>
  );
}
