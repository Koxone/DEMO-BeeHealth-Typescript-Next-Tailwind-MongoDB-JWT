import { ConsultationRepository } from '@/domain/repositories/consultation/ConsultationRepository';

export class GetTotalConsultationsNumberUseCase {
  constructor(private readonly repository: ConsultationRepository) {}

  async execute(patientId: string): Promise<number> {
    // Get the total count of consultations for the patient
    const total = await this.repository.countByPatientId(patientId);

    return total;
  }
}
