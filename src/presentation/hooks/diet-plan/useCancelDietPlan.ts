import { ComplianceStatusEnum } from '@/domain/enums/';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Hook para Cancelar
export const useCancelDietPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      patientId: string;
      dietPlanId: string;
      compliance: {
        status: ComplianceStatusEnum;
        rating: number;
        doctorNotes: string;
      };
    }) => {
      // Destructure input
      const { patientId, ...body } = input;

      // API call
      const response = await fetch(`/api/users/${patientId}/diets/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      // Error handling
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error cancelling diet plan');
      }

      // Return response
      return response.json();
    },

    // Cache invalidation
    onSuccess: (_, { patientId }) => {
      queryClient.invalidateQueries({ queryKey: ['diet-plans', patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-history', patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-diets', patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-timeline', patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-timeline', patientId, 'Dietas'] });
    },
  });
};
