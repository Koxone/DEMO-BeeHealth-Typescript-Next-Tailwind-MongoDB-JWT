import { Plus } from 'lucide-react';

export default function CreateFirstRecordButton({ onCreateNew }) {
  return (
    <button
      onClick={onCreateNew}
      className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-md transition active:scale-95 sm:w-auto"
    >
      <Plus className="h-4 w-4" />
      Crear primer registro
    </button>
  );
}
