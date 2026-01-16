import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export function useGetSinglePatient() {
  const { id } = useParams<{ id: string }>();

  const fetchPatient = async () => {
    const res = await fetch(`/api/users/${id}`);

    if (!res.ok) {
      throw new Error('No se pudo obtener el usuario');
    }

    const json = await res.json();

    // El endpoint devuelve: { user: {...} }
    return json.user;
  };

  const query = useQuery({
    queryKey: ['single-patient', id],
    queryFn: fetchPatient,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    patient: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error ? query.error.message : null,
    refetch: query.refetch,
  };
}
