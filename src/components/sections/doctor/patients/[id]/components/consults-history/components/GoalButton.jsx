import { Plus } from 'lucide-react';
import React from 'react';

export default function GoalButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-beehealth-green-secondary-dark hover:bg-beehealth-green-secondary-dark-hover flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-md transition active:scale-95 sm:w-auto"
    >
      <Plus className="h-4 w-4" />
      Crear Meta
    </button>
    // <div
    //   title="Proximamente"
    //   className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-gray-400 px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-gray-500 active:scale-95 sm:w-auto"
    // >
    //   <Plus className="h-4 w-4" />
    //   Crear Meta
    // </div>
  );
}
