import { DietPlan } from '@/domain/entities/diet-plan/DietPlan';

export interface DietPlanRepository {
  findById(id: string): Promise<DietPlan | null>;

  findByConsultationId(consultationId: string): Promise<DietPlan[]>;

  findAllByConsultationIds(consultationIds: string[]): Promise<DietPlan[]>;

  findByPatientId(patientId: string): Promise<DietPlan[]>;

  findActiveByPatientId(patientId: string): Promise<DietPlan | null>;

  findHistoryByParentId(parentId: string): Promise<DietPlan[]>;

  saveEvolution(supersededPlan: DietPlan, newPlan: DietPlan): Promise<void>;

  update(dietPlan: DietPlan): Promise<void>;

  save(dietPlan: DietPlan): Promise<void>;
}
