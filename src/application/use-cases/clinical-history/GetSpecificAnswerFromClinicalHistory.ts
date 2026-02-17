import { UserSpecialty } from '@/domain/enums/';
import { ClinicalHistoryRepository } from '@/domain/repositories/clinical-history/ClinicalHistoryRepository';

export class GetSpecificAnswerFromClinicalHistory {
  constructor(private readonly repository: ClinicalHistoryRepository) {}

  async execute(patientId: string, specialty: UserSpecialty, questionId: number) {
    // 1. Buscamos por el identificador de negocio (Paciente + Especialidad)
    const history = await this.repository.findByPatientIdAndSpecialty(patientId, specialty);

    if (!history) throw new Error('Clinical History for this patient not found');

    const answer = history.answers.getAnswer(questionId);

    if (!answer) {
      throw new Error(`Question ${questionId} not found`);
    }

    return answer;
  }
}
