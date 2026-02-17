import { PatientTimelineEventDTOPresentation } from '@/presentation/types/';
import { useQuery } from '@tanstack/react-query';

export const useGetPatientTimeline = (patientId: string) => {
  return useQuery<PatientTimelineEventDTOPresentation[]>({
    queryKey: ['patient-timeline', patientId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${patientId}/timeline`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al obtener la línea de tiempo');
      }

      return response.json();
    },
    enabled: !!patientId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

// Usage Example:
// const { data: timelineEvents, isLoading, error } = useGetPatientTimeline(patientId);
