import { ComplianceStatusEnum } from '@/domain/enums/diet/ComplianceStatusEnum';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRenewWorkoutPlan = (patientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      workoutPlanId: string;
      durationDays: number;
      compliance: {
        status: ComplianceStatusEnum;
        rating: number;
        doctorNotes: string;
      };
      newConsultationId: string;
    }) => {
      const response = await fetch(`/api/users/${patientId}/workouts/renew`, {
        method: 'POST',
        body: JSON.stringify({
          workoutPlanId: input.workoutPlanId,
          durationDays: input.durationDays,
          newConsultationId: input.newConsultationId,
          compliance: input.compliance,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Error al renovar entrenamiento');
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
