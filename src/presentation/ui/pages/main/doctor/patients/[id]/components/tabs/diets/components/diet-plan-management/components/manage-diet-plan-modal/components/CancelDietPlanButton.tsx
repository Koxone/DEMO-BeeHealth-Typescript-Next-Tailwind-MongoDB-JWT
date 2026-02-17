// Next, React and Other Libraries
import { X } from 'lucide-react';

// Enums, Types and Interfaces
import { DietPlanResponseDTOPresentation } from '@/presentation/types';

// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

// Prop Types
interface CancelDietPlanButtonProps {
  isDisabled: boolean;
  diet: DietPlanResponseDTOPresentation;
}

export default function CancelDietPlanButton({ isDisabled, diet }: CancelDietPlanButtonProps) {
  // Modal Management with Store
  const { activeModal, data, openModal, closeModal } = useActiveModalStore();

  return (
    <button
      onClick={() => {
        openModal('dietCancel', diet);
      }}
      title="Cancelar Dieta para este paciente"
      className={`group/cancel absolute right-2 bottom-2 scale-90 cursor-pointer rounded-full border bg-white p-1 shadow-md transition-all duration-300 ${
        isDisabled
          ? 'cursor-not-allowed text-gray-300'
          : 'hover:bg-beehealth-red-primary-solid text-gray-400 hover:scale-130 hover:text-white'
      }`}
    >
      <X className="h-4 w-4 group-hover/cancel:animate-bounce" />
    </button>
  );
}
