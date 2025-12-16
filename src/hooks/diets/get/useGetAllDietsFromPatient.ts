import { useQuery } from '@tanstack/react-query';
import { ZDietAssignment } from '@/zod/diets/diet.assignment.schema';
import { dietsResponseSchema } from '@/zod/diets/diet.assignment.schema';

export function useGetAllDietsFromPatient(patientId: string) {
  const { data, isLoading, error, refetch } = useQuery<ZDietAssignment[]>({
    queryKey: ['patient-diets', patientId],
    queryFn: async () => {
      const res = await fetch(`/api/users/${patientId}/diets/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

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
// const { dietsData, isLoading: dietsLoading, error: dietsError, refetch: refetchDiets } = useGetAllDietsFromPatient(patientId);
