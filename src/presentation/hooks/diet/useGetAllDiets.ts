import { GetAllDietTemplatesResponse } from '@/application/use-cases/diet/GetAllDietTemplatesUseCase';
import { useQuery } from '@tanstack/react-query';

export const useGetAllDiets = () => {
  return useQuery<GetAllDietTemplatesResponse>({
    queryKey: ['all-diets'],
    queryFn: async () => {
      const response = await fetch('/api/diets/all-diets');

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch diet templates');
      }

      return response.json();
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

// Usage Example:
// const { data: allDietsData, isLoading: allDietsIsLoading, error: allDietsError } = useGetAllDiets();
