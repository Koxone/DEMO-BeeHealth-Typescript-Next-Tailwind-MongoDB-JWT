import { GoalStatusEnum } from '@/domain/enums/';
import { GoalRepository } from '@/domain/repositories/goal/GoalRepository';
import { ConsultationRepository } from '@/domain/repositories/consultation/ConsultationRepository';
import { calculateResolution, GoalResolution } from '@/domain/services/goal/GoalProgressService';

export class GetPatientGoalsUseCase {
  constructor(
    private readonly goalRepository: GoalRepository,
    private readonly consultationRepository: ConsultationRepository
  ) {}

  async execute(patientId: string, activeConsultationId?: string) {
    const goals = await this.goalRepository.findByPatientId(patientId);

    const activeConsultation = activeConsultationId
      ? await this.consultationRepository.findById(activeConsultationId)
      : null;

    const currentWeight = activeConsultation?.getWeightValue();

    // Filter only ACTIVE goals
    const activeGoals = goals.filter((goal) => goal.getStatus() === GoalStatusEnum.ACTIVE);

    return activeGoals.map((goal) => {
      let resolution: GoalResolution = 'IN_PROGRESS';

      if (typeof currentWeight === 'number') {
        resolution = calculateResolution(goal.getTargetValue(), currentWeight);
      }

      return {
        id: goal.getId(),
        patientId: goal.getPatientId(),
        consultationId: goal.getConsultationId(),
        specialty: goal.getSpecialty(),
        initialValue: goal.getInitialValue(),
        targetValue: goal.getTargetValue(),
        status: goal.getStatus(),
        notes: goal.getNotes(),
        createdAt: goal.getCreatedAt(),
        updatedAt: goal.getUpdatedAt(),
        resolution,
        currentWeight,
      };
    });
  }
}
