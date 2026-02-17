import { ClinicalHistoryRepository } from '@/domain/repositories/clinical-history/ClinicalHistoryRepository';
import { UserSpecialty } from '@/domain/enums/';
import { DateOfBirth } from '@/domain/value-objects/DateOfBirth';

export class GetWeightSummaryFromClinicalHistoryUseCase {
  constructor(private readonly repository: ClinicalHistoryRepository) {}

  async execute(patientId: string) {
    const history = await this.repository.findByPatientIdAndSpecialty(
      patientId,
      UserSpecialty.WEIGHT
    );

    if (!history) throw new Error('Clinical History not found for this patient');

    // Extract age from date of birth if available
    const dateOfBirthRaw = history.answers.getAnswerValue(2);
    const age = dateOfBirthRaw ? new DateOfBirth(dateOfBirthRaw).getAge() : null;

    return {
      patientId: history.patientId,
      specialty: history.specialty,
      lastUpdate: history.updatedAt,
      metrics: {
        age: age,
        gender: history.answers.getAnswerValue(5),
        initialWeight: history.answers.getAnswerValue(7),
        weightGoal: history.answers.getAnswerValue(43),
        initialHeight: history.answers.getAnswerValue(6),
        initialSize: history.answers.getAnswerValue(8),
      },
    };
  }
}
