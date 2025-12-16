'use client';

import { Search, Plus } from 'lucide-react';

/* search-add */
export default function SearchAddBar({ value, onChange, onAdd }) {
  return (
    <div className="bg-beehealth-body-main rounded-2xl border-2 border-gray-200 p-4 shadow-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar paciente..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-xl border-2 border-gray-200 py-3 pr-4 pl-12 font-medium transition outline-none"
          />
        </div>
        <button
          onClick={onAdd}
          className="group bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/30 transition active:scale-95"
        >
          <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
          <span>Registrar Consulta</span>
        </button>
      </div>
    </div>
  );
}
