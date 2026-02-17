import { UserSpecialty } from '@/domain/enums/';

export interface CreatePatientConsultationResponseDTO {
  id: string;
  patientId: string;
  specialty: UserSpecialty;
  createdAt: Date;
}
