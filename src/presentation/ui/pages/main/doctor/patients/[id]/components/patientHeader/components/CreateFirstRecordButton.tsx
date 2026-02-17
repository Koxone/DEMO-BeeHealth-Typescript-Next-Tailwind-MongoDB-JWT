import { Plus } from 'lucide-react';

export default function CreateFirstRecordButton({ onCreateNew }) {
  return (
    <button
      onClick={onCreateNew}
      className="button-beehealth-warning button-beehealth-xs animate-pulse"
    >
      <Plus className="h-4 w-4" />
      Crear primer registro
    </button>
  );
}
