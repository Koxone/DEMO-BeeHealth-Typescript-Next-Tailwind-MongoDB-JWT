import { DietPlanResponseDTOPresentation } from '@/presentation/types';
import { RefreshCw } from 'lucide-react';

// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

// Prop Types
interface RenewDietPlanButtonProps {
  isDisabled: boolean;
  diet: DietPlanResponseDTOPresentation;
}

export default function RenewDietPlanButton({ isDisabled, diet }: RenewDietPlanButtonProps) {
  // Modal Management with Store
  const { activeModal, data, openModal, closeModal } = useActiveModalStore();

  return (
    <button
      disabled={isDisabled}
      onClick={() => {
        if (isDisabled) return;
        openModal('dietRenew', diet);
      }}
      title={
        isDisabled
          ? 'Seleccione una consulta para modificar dietas'
          : 'Renovar dieta para el paciente'
      }
      className={`group/renew absolute top-2 right-2 scale-90 cursor-pointer rounded-full border bg-white p-1 shadow-md transition-all duration-300 ${
        isDisabled
          ? 'cursor-not-allowed text-gray-300'
          : 'hover:bg-beehealth-orange-primary-solid text-gray-400 hover:scale-130 hover:text-white'
      }`}
    >
      <RefreshCw className="h-4 w-4 group-hover/renew:animate-spin" />
    </button>
  );
}
