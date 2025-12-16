'use client';
import { FileText } from 'lucide-react';

/* empty */
export default function EmptyState({ visible }) {
  if (!visible) return null;
  return (
    <div className="p-12 text-center">
      <div className="bg-beehealth-blue-primary-solid mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
        <FileText className="h-10 w-10 text-white" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900">No se encontraron consultas</h3>
      <p className="text-gray-600">Intenta con otra búsqueda o registra una nueva consulta</p>
    </div>
  );
}
