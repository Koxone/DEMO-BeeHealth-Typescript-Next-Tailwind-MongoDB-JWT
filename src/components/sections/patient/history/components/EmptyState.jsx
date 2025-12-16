'use client';

import { FileText, Plus } from 'lucide-react';

export default function EmptyState({ onAdd }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-linear-to-br from-gray-50 to-purple-50 p-12 text-center">
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
        <FileText className="h-10 w-10 text-purple-600" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900">No hay registros aún</h3>
      <p className="mb-6 text-gray-600">Comienza a registrar tus mediciones para ver tu progreso</p>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-purple-700 hover:to-pink-700"
      >
        <Plus className="h-5 w-5" />
        Agregar Primer Registro
      </button>
    </div>
  );
}
