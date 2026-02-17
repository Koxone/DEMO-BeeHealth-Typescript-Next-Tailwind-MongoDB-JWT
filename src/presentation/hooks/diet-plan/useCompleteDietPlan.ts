import { ComplianceStatusEnum } from '@/domain/enums/';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CompleteDietPlanInput {
  patientId: string;
  dietPlanId: string;
  compliance: {
    status: ComplianceStatusEnum;
    rating: number;
    doctorNotes: string;
  };
}

export const useCompleteDietPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CompleteDietPlanInput) => {
      const { patientId, ...body } = input;
      const response = await fetch(`/api/users/${patientId}/diets/complete`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al completar el plan');
      }

      return response.json();
    },
    onSuccess: (_, { patientId }) => {
      queryClient.invalidateQueries({ queryKey: ['diet-plans', patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-history', patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-diets', patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-timeline', patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-timeline', patientId, 'Dietas'] });
    },
  });
};

// Usage Example:
// const { mutate: completeDietPlan, isLoading, error } = useCompleteDietPlan();
// completeDietPlan({ patientId: '123', dietPlanId: '456', compliance: { status: ComplianceStatusEnum.COMPLETED, rating: 5, doctorNotes: 'Great progress' } });
