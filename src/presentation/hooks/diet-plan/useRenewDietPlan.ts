import { ComplianceStatusEnum } from '@/domain/enums/';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Hook para Renovar
export const useRenewDietPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      patientId: string;
      dietPlanId: string;
      durationDays: number;
      newConsultationId?: string;
      compliance: {
        status: ComplianceStatusEnum;
        rating: number;
        doctorNotes: string;
      };
    }) => {
      const { patientId, ...body } = input;
      const response = await fetch(`/api/users/${patientId}/diets/renew`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error('Error renewing diet plan');
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
