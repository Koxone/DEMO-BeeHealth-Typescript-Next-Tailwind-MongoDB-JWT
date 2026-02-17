import { ComplianceStatusEnum } from '@/domain/enums';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCompleteWorkoutPlan = (patientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      workoutPlanId: string;
      compliance: {
        status: ComplianceStatusEnum;
        rating: number;
        doctorNotes: string;
      };
    }) => {
      const response = await fetch(`/api/users/${patientId}/workouts/complete`, {
        method: 'PATCH',
        body: JSON.stringify({
          workoutPlanId: input.workoutPlanId,
          compliance: input.compliance,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Error al completar entrenamiento');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts', patientId] });
      queryClient.invalidateQueries({ queryKey: ['patientTimeline', patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-history', patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-timeline', patientId, 'Ejercicios'] });
    },
  });
};
