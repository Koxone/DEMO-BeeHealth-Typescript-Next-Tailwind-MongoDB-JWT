import { CreateClinicalHistoryDTO } from '@/application/dto/clinical-history/CreateClinicalHistoryDTO';
import { ClinicalHistoryTemplateSectionDTOPresentation } from '@/presentation/types/clinical-history.types';

export class ClinicalHistoryMapper {
  static toCreateDTO(
    patientId: string,
    formData: Record<number, unknown>,
    questionGroups: ClinicalHistoryTemplateSectionDTOPresentation[]
  ): CreateClinicalHistoryDTO {
    const answers: CreateClinicalHistoryDTO['answers'] = [];

    questionGroups.forEach((group) => {
      group.questions.forEach((question) => {
        const value = formData[question.questionId];

        if (value !== undefined && value !== '' && value !== null) {
          answers.push({
            questionId: question.questionId,
            questionText: question.text,
            questionType: question.type,
            value: value,
          });
        } 
      });
    });

    return { patientId, answers };
  }

  static toDisplayGender(gender: string): string {
    const genderMap: Record<string, string> = {
      male: 'Masculino',
      female: 'Femenino',
      other: 'Otro',
    };
    return genderMap[gender.toLowerCase()] || gender;
  }
}
