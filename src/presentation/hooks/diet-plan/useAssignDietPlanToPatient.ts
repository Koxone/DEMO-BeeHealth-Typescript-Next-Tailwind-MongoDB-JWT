import { UserSpecialty } from '@/domain/enums/';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutateFunction } from '@tanstack/react-query';

export interface AssignDietRequest {
  consultationId: string;
  specialty: UserSpecialty;
  dietTemplateId: string;
  durationDays: number;
}

export interface AssignDietResponse {
  message: string;
  data: string;
}

// Types for AssignDietPlanToPatient mutation function
export type AssignDietMutate = UseMutateFunction<
  AssignDietResponse,
  Error,
  AssignDietRequest,
  unknown
>;

export const useAssignDietPlanToPatient = (patientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AssignDietRequest): Promise<AssignDietResponse> => {
      const response = await fetch(`/api/users/${patientId}/diets/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al asignar la dieta');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diet-plans', patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-history', patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-diets', patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-timeline', patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-timeline', patientId, 'Dietas'] });
    },
  });
};

// Usage example:
// const { assignDiet, isLoading: isLoadingAssignDiet, error: assignDietError } = useAssignDietPlanToPatient(patientId);
