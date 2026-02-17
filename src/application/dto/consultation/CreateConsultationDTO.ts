import { ConsultationAnswerDTO } from '@/application/dto/consultation/GetConsultationResponse';

export interface CreateConsultationDTO {
  patientId: string;
  answers: ConsultationAnswerDTO[];
}
