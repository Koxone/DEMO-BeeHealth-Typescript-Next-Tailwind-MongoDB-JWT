import { useQuery } from '@tanstack/react-query';

// Types
import { PatientTimelineEventDTOPresentation } from '@/presentation/types/patient-timeline.types';

export const useGetTimelineEventsByCategory = (patientId: string, tab: string | null) => {
  return useQuery<PatientTimelineEventDTOPresentation[], Error>({
    queryKey: ['patient-timeline', patientId, tab],
    queryFn: async () => {
      if (!patientId || !tab) return [];

      const response = await fetch(`/api/users/${patientId}/timeline/category?tab=${tab}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al obtener el timeline por categoría');
      }

      return response.json();
    },
    enabled: !!patientId && !!tab,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
