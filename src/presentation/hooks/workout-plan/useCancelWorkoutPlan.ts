import { ComplianceStatusEnum } from '@/domain/enums/diet/ComplianceStatusEnum';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCancelWorkoutPlan = (patientId: string) => {
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
      const response = await fetch(`/api/users/${patientId}/workouts/cancel`, {
        method: 'POST',
        body: JSON.stringify({
          workoutPlanId: input.workoutPlanId,
          compliance: input.compliance,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Error al cancelar entrenamiento');
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
