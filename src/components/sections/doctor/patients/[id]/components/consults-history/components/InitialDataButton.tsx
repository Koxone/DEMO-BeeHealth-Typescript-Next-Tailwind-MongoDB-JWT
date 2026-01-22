import { Plus } from 'lucide-react';

function InitialDataButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-beehealth-red-secondary-dark animate-pulse hover:bg-beehealth-red-secondary-dark-hover flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-md transition active:scale-95 sm:w-auto"
    >
      <Plus className="h-4 w-4" /> Peso y Talla Iniciales
    </button>
  );
}

export default InitialDataButton;
