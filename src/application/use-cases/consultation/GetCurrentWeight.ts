import { ConsultationRepository } from '@/domain/repositories/consultation/ConsultationRepository';
import { UserSpecialty } from '@/domain/enums/';

export class GetCurrentWeightUseCase {
  constructor(private readonly repository: ConsultationRepository) {}

  async execute(patientId: string): Promise<number | null> {
    // Get all consultations for the patient in the WEIGHT specialty
    const latestConsultation = await this.repository.findLatestByPatientIdAndSpecialty(
      patientId,
      UserSpecialty.WEIGHT
    );

    // If no consultations found, return null
    if (!latestConsultation) {
      return null;
    }

    // Find the answer with questionId 7 (Current Weight)
    const weightAnswer = latestConsultation.answers
      .getAllAnswers()
      .find((ans) => ans.questionId === 7);

    // Return the value converted to a number or null if it doesn't exist
    return weightAnswer ? Number(weightAnswer.value) : null;
  }
}
