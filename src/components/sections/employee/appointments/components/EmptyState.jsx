'use client';

import { Calendar } from 'lucide-react';

/* empty */
export default function EmptyState() {
  return (
    <div className="bg-beehealth-green-secondary-light rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
        <Calendar className="text-beehealth-green-secondary-solid h-10 w-10" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900">No se encontraron citas</h3>
      <p className="mb-6 text-gray-600">Intenta con otros filtros o agenda una nueva cita</p>
    </div>
  );
}
