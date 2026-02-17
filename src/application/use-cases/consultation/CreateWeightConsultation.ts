import { v4 as uuidv4 } from 'uuid';
import { Consultation } from '@/domain/entities/consultation/Consultation';
import { ConsultationRepository } from '@/domain/repositories/consultation/ConsultationRepository';
import { ConsultationAnswers } from '@/domain/value-objects/consultation/ConsultationAnswers';
import { ConsultationAnswer } from '@/domain/value-objects/consultation/ConsultationAnswer';
import { CreateConsultationDTO } from '@/application/dto/consultation/CreateConsultationDTO';
import { CreatePatientConsultationResponseDTO } from '@/application/dto/consultation/CreatePatientConsultationResponseDTO';

export class CreateWeightConsultationUseCase {
  constructor(private readonly repository: ConsultationRepository) {}

  async execute(dto: CreateConsultationDTO): Promise<CreatePatientConsultationResponseDTO> {
    // Crear value objects
    const consultationAnswers = dto.answers.map((a) =>
      ConsultationAnswer.create({
        questionId: a.questionId,
        questionText: a.questionText,
        questionType: a.questionType,
        value: a.value,
      })
    );

    const answersVO = ConsultationAnswers.create(consultationAnswers);

    // Crear entity
    const weightConsultation = Consultation.create(uuidv4(), dto.patientId, answersVO);

    // Persistir
    const saved = await this.repository.save(weightConsultation);

    return {
      id: saved.consultationId,
      patientId: saved.patientId,
      specialty: saved.specialty,
      createdAt: saved.createdAt,
    };
  }
}
