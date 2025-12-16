'use client';

import { useQuery } from '@tanstack/react-query';

// Types
import { AppointmentItem } from '@/types/appointments/appointments.types';

export function useGetMyAppointments(id?: string) {
  // Fetch function
  const fetchAppointments = async (): Promise<AppointmentItem[]> => {
    if (!id) return [];

    const res = await fetch(`/api/appointments/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || 'Failed to fetch appointments');
    }

    return json.appointments ?? [];
  };

  // Query
  const query = useQuery({
    queryKey: ['patientAppointments', id],
    queryFn: fetchAppointments,
    enabled: !!id,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  return {
    appointments: query.data ?? [],
    loading: query.isLoading,
    error: query.error ? query.error.message : null,
    refetch: query.refetch,
  };
}
