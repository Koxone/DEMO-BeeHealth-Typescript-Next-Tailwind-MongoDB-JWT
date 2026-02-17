import { ConsultationRepository } from '@/domain/repositories/consultation/ConsultationRepository';
import { UserSpecialty } from '@/domain/enums/';
import { Consultation } from '@/domain/entities/consultation/Consultation';

export class GetLatestConsultationUseCase {
  constructor(private readonly repository: ConsultationRepository) {}

  async execute(
    patientId: string,
    specialty: UserSpecialty = UserSpecialty.WEIGHT
  ): Promise<Consultation | null> {
    // Get the most recent consultation for the specified specialty
    const latestConsultation = await this.repository.findLatestByPatientIdAndSpecialty(
      patientId,
      specialty
    );

    // If no consultation is found, return null
    if (!latestConsultation) {
      return null;
    }

    return latestConsultation;
  }
}
