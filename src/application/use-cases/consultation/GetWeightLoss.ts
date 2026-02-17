import { ConsultationRepository } from '@/domain/repositories/consultation/ConsultationRepository';
import { ClinicalHistoryRepository } from '@/domain/repositories/clinical-history/ClinicalHistoryRepository';
import { UserSpecialty } from '@/domain/enums/';

export class GetWeightLossUseCase {
  constructor(
    private readonly consultationRepository: ConsultationRepository,
    private readonly clinicalHistoryRepository: ClinicalHistoryRepository
  ) {}

  async execute(patientId: string): Promise<number> {
    // Get Patient Clinical History for WEIGHT specialty
    const history = await this.clinicalHistoryRepository.findByPatientIdAndSpecialty(
      patientId,
      UserSpecialty.WEIGHT
    );

    if (!history) return 0;

    // Get Initial Weight from Clinical History
    const initialWeight = Number(history.answers.getAnswerValue(7)) || 0;

    if (initialWeight === 0) return 0;

    // Get the latest consultations for WEIGHT specialty
    const latestConsultation = await this.consultationRepository.findLatestByPatientIdAndSpecialty(
      patientId,
      UserSpecialty.WEIGHT
    );

    if (!latestConsultation) return 0;

    // Get the latest consultation and its current weight
    const currentWeightAnswer = latestConsultation.answers
      .getAllAnswers()
      .find((ans) => ans.questionId === 7);

    const currentWeight = Number(currentWeightAnswer?.value) || 0;

    if (currentWeight === 0) return 0;

    // Calculate weight loss
    const loss = initialWeight - currentWeight;

    return Math.round(loss * 10) / 10;
  }
}
