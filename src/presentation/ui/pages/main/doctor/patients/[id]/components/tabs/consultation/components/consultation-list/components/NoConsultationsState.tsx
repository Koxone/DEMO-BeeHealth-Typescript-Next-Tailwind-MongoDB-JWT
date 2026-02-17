// Next, React and Other Libraries
import { ClipboardList, Plus } from 'lucide-react';

// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

function NoConsultationsState() {
  const { openModal } = useActiveModalStore();

  return (
    <div className="bg-beehealth-body-main flex flex-col items-center justify-center rounded-xl border border-(--med-gray-border) py-12 text-center sm:py-16">
      <ClipboardList className="mb-3 h-10 w-10 text-gray-400 sm:h-12 sm:w-12" />
      <p className="mb-1 text-sm font-medium text-(--med-text-dark) sm:text-base">
        Sin consultas clínicas
      </p>
      <p className="mb-4 text-xs text-(--med-text-muted) sm:text-sm">
        Comienza agregando la primer consulta
      </p>
      <button
        onClick={() => openModal('createConsultation')}
        className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition active:scale-95"
      >
        <Plus className="h-4 w-4" />
        Agregar Consulta
      </button>
    </div>
  );
}

export default NoConsultationsState;
