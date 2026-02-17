import { WorkoutTemplate } from '@/domain/entities/workout/WorkoutTemplate';

export interface WorkoutRepository {
  save(workout: WorkoutTemplate): Promise<void>;

  findById(id: string): Promise<WorkoutTemplate | null>;

  findByCategory(category: string): Promise<WorkoutTemplate[]>;

  findAll(): Promise<WorkoutTemplate[]>;

  delete(id: string): Promise<void>;
}
