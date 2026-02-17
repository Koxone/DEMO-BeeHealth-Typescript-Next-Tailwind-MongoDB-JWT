import { Goal } from '@/domain/entities';

export interface GoalRepository {
  findById(id: string): Promise<Goal | null>;
  findByPatientId(patientId: string): Promise<Goal[]>;
  findByConsultationId(consultationId: string): Promise<Goal[]>;
  findActiveByPatientId(patientId: string): Promise<Goal | null>;
  save(goal: Goal): Promise<Goal>;
  update(goal: Goal): Promise<void>;
  delete(id: string): Promise<void>;
}
