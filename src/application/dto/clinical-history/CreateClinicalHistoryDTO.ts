import { ClinicalHistoryAnswerDTOPresentation } from '@/presentation/types';

export interface CreateClinicalHistoryDTO {
  patientId: string;
  answers: ClinicalHistoryAnswerDTOPresentation[];
}
