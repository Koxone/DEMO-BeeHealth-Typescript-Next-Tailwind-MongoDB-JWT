import { AssignWorkoutDTOPresentation } from '@/presentation/types';
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';

export type AssignWorkoutMutate = UseMutateFunction<
  AssignWorkoutDTOPresentation,
  Error,
  AssignWorkoutDTOPresentation,
  unknown
>;

export const useAssignWorkoutPlanToPatient = (patientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AssignWorkoutDTOPresentation) => {
      const response = await fetch(`/api/users/${patientId}/workouts/assign`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Error al asignar entrenamiento');
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
