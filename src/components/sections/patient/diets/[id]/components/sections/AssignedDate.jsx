import { Calendar } from 'lucide-react';
import React from 'react';

function AssignedDate({ diet }) {
  return (
    <div className="bg-beehealth-body-main flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-gray-300">
      <div className="rounded-lg bg-purple-50 p-2">
        <Calendar className="h-5 w-5 text-purple-600" />
      </div>
      <div>
        <p className="text-xs tracking-wide text-gray-500 uppercase">Creado</p>
        <p className="text-sm font-semibold text-gray-900">
          {new Date(diet.createdAt).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}

export default AssignedDate;
