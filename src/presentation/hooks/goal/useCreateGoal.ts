import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserSpecialty } from '@/domain/enums/';

export interface CreateGoalDTO {
  consultationId: string;
  specialty: UserSpecialty;
  initialValue: number;
  targetValue: number;
  notes?: string;
}

export const useCreateGoal = (patientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateGoalDTO) => {
      const response = await fetch(`/api/users/${patientId}/goal/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error creating goal');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidar metas y timeline para mostrar el nuevo evento
      queryClient.invalidateQueries({ queryKey: ['goals', patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-timeline', patientId] });
    },
  });
};
