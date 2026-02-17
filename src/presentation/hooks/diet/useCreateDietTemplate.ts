import { SaveDietTemplateDTOPresentation } from '@/presentation/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateDietTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SaveDietTemplateDTOPresentation) => {
      const response = await fetch('/api/diets/create-template', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create diet template');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diet-templates'] });
      queryClient.invalidateQueries({ queryKey: ['all-diets'] });
    },
  });
};
