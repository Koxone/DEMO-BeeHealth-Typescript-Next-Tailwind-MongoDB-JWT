import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateWorkoutTemplateRequest } from '@/application/use-cases/workout/CreateWorkoutTemplateUseCase';

export const useCreateWorkoutTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateWorkoutTemplateRequest) => {
      const response = await fetch('/api/workouts/create-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create workout template');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    },
  });
};
