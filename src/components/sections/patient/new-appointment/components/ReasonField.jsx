'use client';

import { FileText } from 'lucide-react'; // icon

/* text */
export default function ReasonField({ value, onChange }) {
  return (
    <div className="animate-slideDown bg-beehealth-body-main rounded-2xl border-2 border-gray-200 p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-green-100 p-2">
          <FileText className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Motivo de la consulta</h2>
          <p className="text-sm text-gray-600">Describe brevemente tu motivo de consulta</p>
        </div>
      </div>

      <textarea
        rows="4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        placeholder="Ej: Revisión de rutina, control de glucosa, consulta sobre alimentación..."
      />
    </div>
  );
}
