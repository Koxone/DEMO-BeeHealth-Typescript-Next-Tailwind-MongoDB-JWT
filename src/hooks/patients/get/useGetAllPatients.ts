import { useQuery } from '@tanstack/react-query';

/* Types */
import { ZUser } from '@/zod/user.schema';
import { patientResponseSchema } from '@/zod/api.users.patients.schema';

export function useGetAllPatients() {
  const fetchPatients = async (): Promise<ZUser[]> => {
    // Fetch request
    const res = await fetch('/api/users/patients');
    if (!res.ok) throw new Error('Failed to fetch patients');

    // Parse json
    const json = await res.json();

    // Zod validation
    const data = patientResponseSchema.parse(json);

    // Return list
    return data.patients;
  };

  /* Query */
  const query = useQuery({
    queryKey: ['all-patients'],
    queryFn: fetchPatients,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    patients: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error ? query.error.message : null,
    refetch: query.refetch,
  };
}
