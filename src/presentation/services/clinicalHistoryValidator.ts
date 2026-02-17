import { ClinicalHistoryTemplateSectionDTOPresentation } from '@/presentation/types/clinical-history.types';

export interface ValidationResult {
  isValid: boolean;
  errorField?: string;
}

export class ClinicalHistoryValidator {
  static validateRequiredFields(
    formData: Record<number, unknown>,
    questionGroups: ClinicalHistoryTemplateSectionDTOPresentation[]
  ): ValidationResult {
    for (const group of questionGroups) {
      for (const question of group.questions) {
        if (question.required) {
          const value = formData[question.questionId];
          if (value === undefined || value === '' || value === null) {
            return {
              isValid: false,
              errorField: question.text,
            };
          }
        }
      }
    }
    return { isValid: true };
  }
}
