import { PatientTimeline } from '@/domain/entities/patient-timeline/PatientTimeline';
import { UserSpecialty, ComplianceStatusEnum, TimelineEventTypeEnum } from '@/domain/enums/';
import { WorkoutPlanRepository } from '@/domain/repositories/workout-plan/WorkoutPlanRepository';
import { PatientTimelineRepository } from '@/domain/repositories/patient-timeline/PatientTimelineRepository';

export class CompleteWorkoutPlanUseCase {
  constructor(
    private readonly workoutPlanRepository: WorkoutPlanRepository,
    private readonly timelineRepository: PatientTimelineRepository
  ) {}

  async execute(input: {
    workoutPlanId: string;
    compliance: { status: ComplianceStatusEnum; rating: number; doctorNotes: string };
  }): Promise<void> {
    const workoutPlan = await this.workoutPlanRepository.findById(input.workoutPlanId);
    if (!workoutPlan) throw new Error('Workout plan not found');

    workoutPlan.complete(input.compliance);
    await this.workoutPlanRepository.update(workoutPlan);

    const timelineEvent = PatientTimeline.create({
      consultationId: workoutPlan.getConsultationId(),
      patientId: workoutPlan.getPatientId(),
      specialty: UserSpecialty.WEIGHT,
      eventType: TimelineEventTypeEnum.WORKOUT_COMPLETED,
      resourceId: workoutPlan.getWorkoutId(),
      snapshot: {
        workoutName: workoutPlan.getWorkoutSnapshot().name,
        workoutImages: workoutPlan.getWorkoutSnapshot().images,
        completedAt: workoutPlan.getUpdatedAt(),
        compliance: workoutPlan.getCompliance(),
      },
    });

    await this.timelineRepository.save(timelineEvent);
  }
}
