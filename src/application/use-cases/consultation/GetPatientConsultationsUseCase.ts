import { ConsultationRepository } from '@/domain/repositories/consultation/ConsultationRepository';
import { UserSpecialty } from '@/domain/enums/';
import { ClinicalHistoryAnswerDTOApplication } from '@/application/types/clinical-history.application.types';

export interface GetPatientConsultationResponseDTO {
  id: string;
  patientId: string;
  specialty: UserSpecialty;
  answers: ClinicalHistoryAnswerDTOApplication[];
  createdAt: Date;
  updatedAt: Date;
}

export class GetWeightConsultationUseCase {
  constructor(private readonly repository: ConsultationRepository) {}

  // Cambio: Ahora devuelve una Promise de un Array []
  async execute(patientId: string): Promise<GetPatientConsultationResponseDTO[]> {
    const consultations = await this.repository.findAllByPatientIdAndSpecialty(
      patientId,
      UserSpecialty.WEIGHT
    );

    // Si no hay consultas, devolvemos un array vacío
    if (!consultations) return [];

    // Mapeamos cada entidad encontrada al DTO de respuesta
    return consultations.map((consultation) => ({
      id: consultation.id,
      patientId: consultation.patientId,
      specialty: consultation.specialty,
      answers: consultation.answers.getAllAnswers().map((a) => a.toPersistence()),
      createdAt: consultation.createdAt,
      updatedAt: consultation.updatedAt,
    }));
  }
}
