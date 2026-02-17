import { UserSpecialty, QuestionType } from '@/domain/enums/';

// Answers DTO
export interface ConsultationAnswerDTO {
  questionId: number;
  questionText: string;
  questionType: QuestionType;
  value: unknown;
}

// Response DTO
export interface GetConsultationResponseDTO {
  id: string;
  patientId: string;
  specialty: UserSpecialty;
  answers: ConsultationAnswerDTO[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
