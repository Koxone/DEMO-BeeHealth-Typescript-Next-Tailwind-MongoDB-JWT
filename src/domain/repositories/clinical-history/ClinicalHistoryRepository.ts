import { UserSpecialty } from '@/domain/enums/';
import { WeightClinicalHistory } from '@/domain/entities/clinical-history/WeightClinicalHistory';

export interface ClinicalHistoryRepository {
  findById(id: string): Promise<WeightClinicalHistory | null>;
  findByPatientId(patientId: string): Promise<WeightClinicalHistory[]>;
  findByPatientIdAndSpecialty(
    patientId: string,
    specialty: UserSpecialty
  ): Promise<WeightClinicalHistory | null>;
  exists(patientId: string, specialty: UserSpecialty): Promise<boolean>;
  save(history: WeightClinicalHistory): Promise<WeightClinicalHistory>;
}
