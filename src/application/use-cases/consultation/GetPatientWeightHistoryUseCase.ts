import { ConsultationRepository } from '@/domain/repositories/consultation/ConsultationRepository';
import { UserSpecialty } from '@/domain/enums/';

export interface WeightHistoryPoint {
  date: Date;
  weight: number;
}

export class GetPatientWeightHistoryUseCase {
  constructor(private readonly repository: ConsultationRepository) {}

  async execute(patientId: string): Promise<WeightHistoryPoint[]> {
    const consultations = await this.repository.findAllByPatientIdAndSpecialty(
      patientId,
      UserSpecialty.WEIGHT
    );

    const history = consultations.map((consultation) => {
      const weightAnswer = consultation.answers.getAllAnswers().find((ans) => ans.questionId === 7);

      return {
        date: consultation.createdAt,
        weight: weightAnswer ? Number(weightAnswer.value) : null,
      };
    });

    return history
      .filter((point): point is WeightHistoryPoint => point.weight !== null && !isNaN(point.weight))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }
}
