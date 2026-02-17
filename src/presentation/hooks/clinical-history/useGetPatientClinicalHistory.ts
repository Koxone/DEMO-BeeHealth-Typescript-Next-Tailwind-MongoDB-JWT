import { useQuery } from '@tanstack/react-query';

// Types
import { ClinicalHistoryDTOPresentation } from '@/presentation/types/clinical-history.types';

export function useGetPatientClinicalHistory(patientId: string | undefined) {
  return useQuery<ClinicalHistoryDTOPresentation | null>({
    queryKey: ['patient-clinical-history', patientId],
    enabled: !!patientId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    queryFn: async () => {
      const res = await fetch(`/api/clinical-history/${patientId}`);
      if (!res.ok) return null;
      return res.json();
    },
  });
}
