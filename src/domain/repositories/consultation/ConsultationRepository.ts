import { UserSpecialty } from '@/domain/enums/';
import { Consultation } from '@/domain/entities/consultation/Consultation';

export interface ConsultationRepository {
  findById(id: string): Promise<Consultation | null>;

  findByPatientId(patientId: string): Promise<Consultation[]>;

  findByPatientIdAndSpecialty(
    patientId: string,
    specialty: UserSpecialty
  ): Promise<Consultation | null>;

  findAllByPatientIdAndSpecialty(
    patientId: string,
    specialty: UserSpecialty
  ): Promise<Consultation[]>;

  findLatestByPatientIdAndSpecialty(
    patientId: string,
    specialty: UserSpecialty
  ): Promise<Consultation | null>;

  countByPatientId(patientId: string): Promise<number>;

  exists(patientId: string, specialty: UserSpecialty): Promise<boolean>;

  save(history: Consultation): Promise<Consultation>;
}
