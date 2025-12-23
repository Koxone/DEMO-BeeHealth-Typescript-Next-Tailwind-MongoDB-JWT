'use client';

import { Search, Plus } from 'lucide-react';

export default function ControlsBar({ searchTerm, setSearchTerm, onCreate }) {
  return (
    <div className="bg-beehealth-body-main rounded-2xl border-2 border-gray-200 p-4 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            maxLength={250}
            type="text"
            placeholder="Buscar por nombre o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border-2 border-gray-200 py-3 pr-4 pl-12 font-medium transition-all duration-200 outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={onCreate}
            className="group bg-beehealth-blue-secondary-solid hover:bg-beehealth-blue-secondary-solid-hover flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-all duration-200 active:scale-95"
          >
            <Plus className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90" />
            <span className="hidden sm:inline">Agendar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
