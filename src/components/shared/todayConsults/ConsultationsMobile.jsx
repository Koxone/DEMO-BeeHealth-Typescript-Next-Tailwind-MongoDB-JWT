'use client';

import { Edit2, Trash2 } from 'lucide-react';

/* mobile-cards */
export default function ConsultationsMobile({ rows, onEdit, onDelete }) {
  return (
    <div className="space-y-3 p-4 md:hidden">
      {rows.map((c, i) => (
        <div
          key={c?.patient?._id + i}
          style={{ animationDelay: `${i * 50}ms` }}
          className="animate-fadeInUp rounded-xl border-2 border-gray-200 bg-linear-to-br from-indigo-50 to-purple-50 p-4 transition hover:border-indigo-300 hover:shadow-lg"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 font-bold text-white shadow-md">
                {c.avatar}
              </div>
              <div>
                <p className="font-bold text-gray-900">{c.paciente}</p>
                <p className="text-xs text-gray-600">{c.tipo}</p>
              </div>
            </div>
            <span
              className={`rounded-lg border px-3 py-1.5 text-xs font-bold ${
                c.pagado
                  ? 'border-emerald-200 bg-emerald-100 text-emerald-700'
                  : 'border-amber-200 bg-amber-100 text-amber-700'
              }`}
            >
              {c.pagado ? 'Pagado' : 'Pendiente'}
            </span>
          </div>

          <div className="mb-3 grid grid-cols-2 gap-2">
            <div className="bg-beehealth-body-main rounded-lg p-3">
              <p className="mb-1 text-xs text-gray-600">Fecha</p>
              <p className="text-sm font-bold text-gray-900">{c.fecha}</p>
              <p className="text-xs text-gray-500">{c.hora}</p>
            </div>
            <div className="bg-beehealth-body-main rounded-lg p-3">
              <p className="mb-1 text-xs text-gray-600">Costo</p>
              <p className="text-xl font-bold text-indigo-600">${c.costo}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(c)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100 active:scale-95"
            >
              <Edit2 className="h-4 w-4" />
              Editar
            </button>
            <button
              onClick={() => onDelete(c)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 active:scale-95"
            >
              <Trash2 className="h-4 w-4" />
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
