// Entities
import { DietPlan } from '@/domain/entities/diet-plan/DietPlan';
import { DietPlanStatusEnum } from '@/domain/enums/';

// Repositories
import { DietPlanRepository } from '@/domain/repositories/diet-plan/DietPlanRepository';

export class GetPatientDietPlansUseCase {
  constructor(private readonly dietPlanRepository: DietPlanRepository) {}

  async execute(input: { patientId: string }): Promise<DietPlan[]> {
    const dietPlans = await this.dietPlanRepository.findByPatientId(input.patientId);

    return dietPlans.filter(
      (plan) =>
        plan.getStatus() === DietPlanStatusEnum.ACTIVE ||
        plan.getStatus() === DietPlanStatusEnum.RENEWED ||
        plan.getStatus() === DietPlanStatusEnum.COMPLETED
    );
  }
}
