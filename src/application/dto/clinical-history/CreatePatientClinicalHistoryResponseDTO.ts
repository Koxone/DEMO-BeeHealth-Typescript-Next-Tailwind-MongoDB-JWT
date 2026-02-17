import { UserSpecialty } from '@/domain/enums/';

export interface CreatePatientClinicalHistoryResponseDTO {
  id: string;
  patientId: string;
  specialty: UserSpecialty;
  createdAt: Date;
}
