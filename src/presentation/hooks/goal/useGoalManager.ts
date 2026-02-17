import { useParams } from 'next/navigation';
import { useCreateGoal } from './useCreateGoal';
import { useCompleteGoal } from './useCompleteGoal';
import { useFailGoal } from './useFailGoal';
import { useCancelGoal } from './useCancelGoal';
import { useGetPatientGoals } from './useGetPatientGoals';
import { GoalStatusEnum } from '@/domain/enums';

export const useGoalManager = () => {
  const { id: patientId } = useParams<{ id: string }>();

  const { data: goals, isLoading } = useGetPatientGoals(patientId!);
  const createMutation = useCreateGoal(patientId!);
  const completeMutation = useCompleteGoal(patientId!);
  const failMutation = useFailGoal(patientId!);
  const cancelMutation = useCancelGoal(patientId!);

  const activeGoal = goals?.find((g) => g.status === GoalStatusEnum.ACTIVE) || null;

  return {
    goals,
    activeGoal,
    isLoading,
    createGoal: createMutation.mutate,
    completeGoal: completeMutation.mutate,
    failGoal: failMutation.mutate,
    cancelGoal: cancelMutation.mutate,
    isProcessing:
      createMutation.isPending ||
      completeMutation.isPending ||
      failMutation.isPending ||
      cancelMutation.isPending,
  };
};

// Usage Example:
// const { goals, activeGoal, isLoading, createGoal, completeGoal, failGoal, cancelGoal } = useGoalManager();
