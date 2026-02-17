import { PatientTimeline } from '@/domain/entities/patient-timeline/PatientTimeline';
import { TimelineEventTypeEnum } from '@/domain/enums/';
import { GoalRepository } from '@/domain/repositories/goal/GoalRepository';
import { PatientTimelineRepository } from '@/domain/repositories/patient-timeline/PatientTimelineRepository';

export class CancelGoalUseCase {
  constructor(
    private readonly goalRepository: GoalRepository,
    private readonly timelineRepository: PatientTimelineRepository
  ) {}

  async execute(goalId: string): Promise<void> {
    const goal = await this.goalRepository.findById(goalId);
    if (!goal) throw new Error('Goal not found');

    goal.cancel();
    await this.goalRepository.update(goal);

    const timelineEvent = PatientTimeline.create({
      consultationId: goal.getConsultationId(),
      patientId: goal.getPatientId(),
      specialty: goal.getSpecialty(),
      eventType: TimelineEventTypeEnum.GOAL_CANCELLED,
      resourceId: goal.getId(),
      snapshot: {
        cancelledAt: goal.getUpdatedAt(),
        targetValue: goal.getTargetValue(),
      },
    });

    await this.timelineRepository.save(timelineEvent);
  }
}
