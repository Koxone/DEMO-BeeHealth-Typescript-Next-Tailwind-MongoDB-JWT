import { ClinicalHistoryRepository } from '@/domain/repositories/clinical-history/ClinicalHistoryRepository';
import { UserSpecialty } from '@/domain/enums/';
import { ClinicalHistoryAnswerDTOApplication } from '@/application/types/clinical-history.application.types';

export interface GetPatientClinicalHistoryUseCase {
  id: string;
  patientId: string;
  specialty: UserSpecialty;
  answers: ClinicalHistoryAnswerDTOApplication[];
  createdAt: Date;
  updatedAt: Date;
}

export class GetWeightClinicalHistoryUseCase {
  constructor(private readonly repository: ClinicalHistoryRepository) {}

  async execute(patientId: string): Promise<GetPatientClinicalHistoryUseCase | null> {
    const history = await this.repository.findByPatientIdAndSpecialty(
      patientId,
      UserSpecialty.WEIGHT
    );

    if (!history) return null;

    return {
      id: history.historyId,
      patientId: history.patientId,
      specialty: history.specialty,
      answers: history.answers.getAllAnswers().map((a) => a.toPersistence()),
      createdAt: history.createdAt,
      updatedAt: history.updatedAt,
    };
  }
}
