import { WorkoutPlan } from '@/domain/entities/workout-plan/WorkoutPlan';
import { WorkoutStatusEnum } from '@/domain/enums/';
import { WorkoutPlanRepository } from '@/domain/repositories/workout-plan/WorkoutPlanRepository';

export class GetPatientWorkoutPlansUseCase {
  constructor(private readonly workoutPlanRepository: WorkoutPlanRepository) {}

  async execute(input: { patientId: string }): Promise<WorkoutPlan[]> {
    const workoutPlans = await this.workoutPlanRepository.findByPatientId(input.patientId);

    return workoutPlans.filter(
      (plan) =>
        plan.getStatus() === WorkoutStatusEnum.ACTIVE ||
        plan.getStatus() === WorkoutStatusEnum.RENEWED ||
        plan.getStatus() === WorkoutStatusEnum.COMPLETED
    );
  }
}
