import { useQuery } from '@tanstack/react-query';
import { ClinicalHistoryTemplateSectionDTOPresentation } from '@/presentation/types';

interface ConsultationTemplateResponse {
  sections: ClinicalHistoryTemplateSectionDTOPresentation[];
}

export function useGetConsultationTemplates(specialty: string) {
  return useQuery<ClinicalHistoryTemplateSectionDTOPresentation[]>({
    queryKey: ['consultation-templates', specialty],
    enabled: !!specialty,

    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours

    queryFn: async () => {
      const res = await fetch(`/api/consultation/templates/${specialty}`);
      if (!res.ok) {
        throw new Error('Failed to fetch consultation templates');
      }

      const data: ConsultationTemplateResponse = await res.json();
      return data.sections || [];
    },
  });
}
