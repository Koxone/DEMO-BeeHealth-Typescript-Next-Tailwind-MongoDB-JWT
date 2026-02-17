import { ConsultationRepository } from '@/domain/repositories/consultation/ConsultationRepository';
import { UserSpecialty } from '@/domain/enums/';

export class GetCurrentSizeUseCase {
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

    // Find the answer with questionId 8 (Current Size)
    const sizeAnswer = latestConsultation.answers
      .getAllAnswers()
      .find((ans) => ans.questionId === 8);

    // Return the value converted to a number or null if it doesn't exist
    return sizeAnswer ? Number(sizeAnswer.value) : null;
  }
}
