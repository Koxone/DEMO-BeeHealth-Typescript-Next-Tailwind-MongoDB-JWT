import { DietTemplateDTOPresentation } from '@/presentation/types';
import { useQuery } from '@tanstack/react-query';

export const useGetDietTemplate = (dietId: string) => {
  return useQuery<DietTemplateDTOPresentation>({
    queryKey: ['diet-template', dietId],
    queryFn: async () => {
      const response = await fetch(`/api/diets/${dietId}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch diet template');
      }
      return response.json();
    },
    enabled: !!dietId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

// Usage example:
// const { data, isLoading, error } = useGetDietTemplate('some-diet-id');
