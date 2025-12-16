import { useQuery } from '@tanstack/react-query';
import { ZDiet } from '@/zod/diets/diet.schema';
import { dietsResponseSchema } from '@/zod/diets/api.diets.schema';

export function useGetAllDiets() {
  const { data, isLoading, error, refetch } = useQuery<ZDiet[]>({
    queryKey: ['diets'],
    queryFn: async () => {
      const res = await fetch('/api/diets');
      if (!res.ok) throw new Error('Failed to fetch diets');

      const json = await res.json();
      const result = dietsResponseSchema.safeParse(json);

      if (!result.success) {
        console.error(result.error.format());
        throw new Error('Invalid diet data');
      }

      return result.data.diets;
    },
  });

  return {
    dietsData: data ?? [],
    isLoading,
    error: error?.message ?? null,
    refetch,
  };
}

// Usage Example:
// const { dietsData, isLoading: dietsLoading, error: dietsError, refetch: refetchDiets } = useGetAllDiets();
