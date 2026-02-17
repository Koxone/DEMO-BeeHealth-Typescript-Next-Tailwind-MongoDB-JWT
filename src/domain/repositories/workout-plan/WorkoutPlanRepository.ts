import { WorkoutPlan } from '@/domain/entities/workout-plan/WorkoutPlan';

export interface WorkoutPlanRepository {
  findById(id: string): Promise<WorkoutPlan | null>;
  findByConsultationId(consultationId: string): Promise<WorkoutPlan[]>;
  findAllByConsultationIds(consultationIds: string[]): Promise<WorkoutPlan[]>;
  findByPatientId(patientId: string): Promise<WorkoutPlan[]>;
  findActiveByPatientId(patientId: string): Promise<WorkoutPlan | null>;
  findHistoryByParentId(parentId: string): Promise<WorkoutPlan[]>;
  saveEvolution(supersededPlan: WorkoutPlan, newPlan: WorkoutPlan): Promise<void>;
  update(workoutPlan: WorkoutPlan): Promise<void>;
  save(workoutPlan: WorkoutPlan): Promise<void>;
}
