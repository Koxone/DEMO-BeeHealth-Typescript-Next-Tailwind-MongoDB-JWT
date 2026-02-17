import { DietPlanResponseDTOPresentation } from '@/presentation/types';
import { Power, RefreshCw } from 'lucide-react';

// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

// Prop Types
interface CompleteDietPlanButtonProps {
  isDisabled: boolean;
  diet: DietPlanResponseDTOPresentation;
}

export default function CompleteDietPlanButton({ isDisabled, diet }: CompleteDietPlanButtonProps) {
  // Modal Management with Store
  const { openModal } = useActiveModalStore();

  return (
    <button
      onClick={() => {
        if (isDisabled) return;

        if (diet?.status === 'active' || diet?.status === 'renewed') {
          openModal('dietComplete', diet);
        } else if (diet?.status === 'completed') {
          openModal('dietRenew', diet);
        }
      }}
      title={
        isDisabled
          ? 'Seleccione una consulta para modificar dietas'
          : diet?.status === 'active' || diet?.status === 'renewed'
            ? 'Marcar como completada'
            : 'Renovar dieta'
      }
      className={`group/icon relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full transition-all duration-300 ${
        isDisabled
          ? 'cursor-not-allowed bg-gray-200 shadow-inner'
          : diet?.status === 'active' || diet?.status === 'renewed'
            ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.7)] active:scale-95'
            : 'bg-beehealth-orange-primary-solid hover:bg-beehealth-orange-primary-solid-hover shadow-md hover:scale-105 active:scale-95'
      }`}
    >
      {diet?.status !== 'completed' ? (
        <Power className="h-10 w-10 text-white" strokeWidth={2.5} />
      ) : (
        <RefreshCw
          className="h-10 w-10 text-neutral-200 group-hover/icon:animate-spin"
          strokeWidth={2.5}
        />
      )}
    </button>
  );
}
