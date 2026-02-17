import { WorkoutPlanDTOPresentation } from '@/presentation/types';
import { Power, RefreshCw } from 'lucide-react';

// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

// Prop Types
interface CompleteWorkoutPlanButtonProps {
  isDisabled: boolean;
  workout: WorkoutPlanDTOPresentation;
}

export default function CompleteWorkoutPlanButton({
  isDisabled,
  workout,
}: CompleteWorkoutPlanButtonProps) {
  // Modal Management with Store
  const { openModal } = useActiveModalStore();

  return (
    <button
      onClick={() => {
        if (isDisabled) return;

        if (workout?.status === 'active' || workout?.status === 'renewed') {
          openModal('workoutComplete', workout);
        } else if (workout?.status === 'completed') {
          openModal('workoutRenew', workout);
        }
      }}
      title={
        isDisabled
          ? 'Seleccione una consulta para modificar entrenamientos'
          : workout?.status === 'active' || workout?.status === 'renewed'
            ? 'Marcar como completada'
            : 'Renovar entrenamiento'
      }
      className={`group/icon relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full transition-all duration-300 ${
        isDisabled
          ? 'cursor-not-allowed bg-gray-200 shadow-inner'
          : workout?.status === 'active' || workout?.status === 'renewed'
            ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.7)] active:scale-95'
            : 'bg-beehealth-orange-primary-solid hover:bg-beehealth-orange-primary-solid-hover shadow-md hover:scale-105 active:scale-95'
      }`}
    >
      {workout?.status !== 'completed' ? (
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
