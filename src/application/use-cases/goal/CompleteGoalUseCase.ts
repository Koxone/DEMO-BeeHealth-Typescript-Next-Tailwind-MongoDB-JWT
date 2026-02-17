import { PatientTimeline } from '@/domain/entities/patient-timeline/PatientTimeline';
import { TimelineEventTypeEnum } from '@/domain/enums/';
import { GoalRepository } from '@/domain/repositories/goal/GoalRepository';
import { PatientTimelineRepository } from '@/domain/repositories/patient-timeline/PatientTimelineRepository';
import { ConsultationRepository } from '@/domain/repositories/consultation/ConsultationRepository';

export class CompleteGoalUseCase {
  constructor(
    private readonly goalRepository: GoalRepository,
    private readonly timelineRepository: PatientTimelineRepository,
    private readonly consultationRepository: ConsultationRepository
  ) {}

  async execute(input: { goalId: string; consultationId: string }): Promise<void> {
    const goal = await this.goalRepository.findById(input.goalId);
    if (!goal) throw new Error('Goal not found');

    const consultation = await this.consultationRepository.findById(input.consultationId);
    if (!consultation) throw new Error('Consultation not found');

    const currentWeight = consultation.getWeightValue();
    if (!currentWeight || isNaN(currentWeight)) {
      throw new Error('La consulta no tiene un registro de peso válido para cerrar la meta.');
    }

    goal.complete(currentWeight);
    await this.goalRepository.update(goal);

    const timelineEvent = PatientTimeline.create({
      consultationId: goal.getConsultationId(),
      patientId: goal.getPatientId(),
      specialty: goal.getSpecialty(),
      eventType: TimelineEventTypeEnum.GOAL_COMPLETED,
      resourceId: goal.getId(),
      snapshot: {
        initialValue: goal.getInitialValue(),
        targetValue: goal.getTargetValue(),
        finalValue: goal.getFinalValue(),
        completedAt: goal.getUpdatedAt(),
      },
    });

    await this.timelineRepository.save(timelineEvent);
  }
}
