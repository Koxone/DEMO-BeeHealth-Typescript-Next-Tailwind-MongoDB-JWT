import { WeightClinicalHistory } from '@/domain/entities/clinical-history/WeightClinicalHistory';
import { ClinicalHistoryRepository } from '@/domain/repositories/clinical-history/ClinicalHistoryRepository';
import { ClinicalHistoryAnswers } from '@/domain/value-objects/clinical-history/ClinicalHistoryAnswers';
import { ClinicalAnswer } from '@/domain/value-objects/clinical-history/ClinicalAnswer';
import { UserSpecialty } from '@/domain/enums/';
import { v4 as uuidv4 } from 'uuid';
import { CreateClinicalHistoryDTO } from '@/application/dto/clinical-history/CreateClinicalHistoryDTO';
import { CreatePatientClinicalHistoryResponseDTO } from '@/application/dto/clinical-history/CreatePatientClinicalHistoryResponseDTO';

export class CreateWeightClinicalHistoryUseCase {
  constructor(private readonly repository: ClinicalHistoryRepository) {}

  async execute(dto: CreateClinicalHistoryDTO): Promise<CreatePatientClinicalHistoryResponseDTO> {
    // Verificar si ya existe un historial para este paciente
    const exists = await this.repository.exists(dto.patientId, UserSpecialty.WEIGHT);

    if (exists) {
      throw new Error('Ya existe un historial clínico de peso para este paciente');
    }

    // Crear value objects
    const clinicalAnswers = dto.answers.map((a) =>
      ClinicalAnswer.create({
        questionId: a.questionId,
        questionText: a.questionText,
        questionType: a.questionType,
        value: a.value,
      })
    );

    const answersVO = ClinicalHistoryAnswers.create(clinicalAnswers);

    // Crear entity
    const weightHistory = WeightClinicalHistory.create(uuidv4(), dto.patientId, answersVO);

    // Persistir
    const saved = await this.repository.save(weightHistory);

    return {
      id: saved.historyId,
      patientId: saved.patientId,
      specialty: saved.specialty,
      createdAt: saved.createdAt,
    };
  }
}
