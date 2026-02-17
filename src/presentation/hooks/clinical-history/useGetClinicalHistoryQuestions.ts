import { useQuery } from '@tanstack/react-query';

// Types
import { ClinicalHistoryTemplateSectionDTOPresentation } from '@/presentation/types/clinical-history.types';
import { UserSpecialty } from '@/domain/enums/';

interface ClinicalHistoryTemplateResponse {
  sections: ClinicalHistoryTemplateSectionDTOPresentation[];
}

export function useGetClinicalHistoryQuestions(specialty: UserSpecialty) {
  return useQuery<ClinicalHistoryTemplateSectionDTOPresentation[]>({
    queryKey: ['clinical-history-questions', specialty],
    enabled: !!specialty,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours

    // Fetch
    queryFn: async () => {
      const res = await fetch(`/api/clinical-history/templates/${specialty}`);
      if (!res.ok) throw new Error('Failed to fetch clinical history questions');

      const data: ClinicalHistoryTemplateResponse = await res.json();

      // Filter
      return data.sections.filter(
        (section) =>
          section.category !== 'En esta consulta' && section.category !== 'Signos Vitales'
      );
    },
  });
}
