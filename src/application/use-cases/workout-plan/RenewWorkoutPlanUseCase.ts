import { WorkoutPlan } from '@/domain/entities/workout-plan/WorkoutPlan';
import { PatientTimeline } from '@/domain/entities/patient-timeline/PatientTimeline';
import { UserSpecialty, ComplianceStatusEnum, TimelineEventTypeEnum } from '@/domain/enums/';
import { WorkoutPlanRepository } from '@/domain/repositories/workout-plan/WorkoutPlanRepository';
import { PatientTimelineRepository } from '@/domain/repositories/patient-timeline/PatientTimelineRepository';

export class RenewWorkoutPlanUseCase {
  constructor(
    private readonly workoutPlanRepository: WorkoutPlanRepository,
    private readonly timelineRepository: PatientTimelineRepository
  ) {}

  async execute(input: {
    workoutPlanId: string;
    durationDays: number;
    compliance: { status: ComplianceStatusEnum; rating: number; doctorNotes: string };
    newConsultationId?: string;
  }): Promise<WorkoutPlan> {
    const currentPlan = await this.workoutPlanRepository.findById(input.workoutPlanId);
    if (!currentPlan) throw new Error('Workout plan not found');

    const newEndDate = new Date();
    newEndDate.setDate(newEndDate.getDate() + input.durationDays);

    const renewedPlan = currentPlan.renew(newEndDate, input.compliance, input.newConsultationId);
    await this.workoutPlanRepository.saveEvolution(currentPlan, renewedPlan);

    const timelineEvent = PatientTimeline.create({
      consultationId: input.newConsultationId ?? currentPlan.getConsultationId(),
      patientId: currentPlan.getPatientId(),
      specialty: UserSpecialty.WEIGHT,
      eventType: TimelineEventTypeEnum.WORKOUT_RENEWED,
      resourceId: renewedPlan.getWorkoutId(),
      snapshot: {
        workoutName: renewedPlan.getWorkoutSnapshot().name,
        workoutImages: renewedPlan.getWorkoutSnapshot().images,
        previousPlanId: currentPlan.getId(),
        compliance: currentPlan.getCompliance(),
      },
    });

    await this.timelineRepository.save(timelineEvent);

    return renewedPlan;
  }
}
