'use client';

import { Pill, FileText, Syringe } from 'lucide-react';

export default function TabsBar({ activeTab, setActiveTab }) {
  const items = [
    { id: 'medicamentos', label: 'Medicamentos', Icon: Pill },
    { id: 'recetas', label: 'Recetas', Icon: FileText },
    { id: 'suministros', label: 'Suministros', Icon: Syringe },
  ];
  return (
    <div className="flex items-center gap-2 border-b border-gray-200 p-2">
      {items.map(({ id, label, Icon }) => {
        const active = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
              active
                ? 'border border-blue-200 bg-blue-50 text-blue-700'
                : 'hover:bg-beehealth-body-main text-gray-700'
            }`}
          >
            <Icon className={`h-4 w-4 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
