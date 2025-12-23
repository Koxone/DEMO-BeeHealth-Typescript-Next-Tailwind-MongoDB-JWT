'use client';

import { Search, Plus } from 'lucide-react';

export default function SearchAddBar({ value, onChange, onAdd, onSale }) {
  return (
    <div className="bg-beehealth-body-main rounded-2xl border-2 border-gray-200 p-4 shadow-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            maxLength={250}
            type="text"
            placeholder="Buscar paciente..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-xl border-2 border-gray-200 py-3 pr-4 pl-12 font-medium transition outline-none"
          />
        </div>
        {/* Register Consult */}
        <button
          onClick={onAdd}
          className="group bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition active:scale-95"
        >
          <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
          <span>Registrar Consulta</span>
        </button>

        {/* Register Sale */}
        <button
          onClick={onSale}
          className="group bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-solid-hover flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition active:scale-95"
        >
          <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
          <span>Registrar Venta</span>
        </button>
      </div>
    </div>
  );
}
