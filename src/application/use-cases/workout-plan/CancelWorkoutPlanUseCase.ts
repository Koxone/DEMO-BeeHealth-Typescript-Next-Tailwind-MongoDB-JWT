import { WorkoutPlan } from '@/domain/entities/workout-plan/WorkoutPlan';
import { PatientTimeline } from '@/domain/entities/patient-timeline/PatientTimeline';
import { UserSpecialty, ComplianceStatusEnum, TimelineEventTypeEnum } from '@/domain/enums/';
import { WorkoutPlanRepository } from '@/domain/repositories/workout-plan/WorkoutPlanRepository';
import { PatientTimelineRepository } from '@/domain/repositories/patient-timeline/PatientTimelineRepository';

export class CancelWorkoutPlanUseCase {
  constructor(
    private readonly workoutPlanRepository: WorkoutPlanRepository,
    private readonly timelineRepository: PatientTimelineRepository
  ) {}

  async execute(input: {
    workoutPlanId: string;
    compliance: {
      status: ComplianceStatusEnum;
      rating: number;
      doctorNotes: string;
    };
  }): Promise<WorkoutPlan> {
    const currentPlan = await this.workoutPlanRepository.findById(input.workoutPlanId);
    if (!currentPlan) throw new Error('Workout plan not found');

    const cancelledPlan = currentPlan.cancel(input.compliance);
    await this.workoutPlanRepository.saveEvolution(currentPlan, cancelledPlan);

    const timelineEvent = PatientTimeline.create({
      consultationId: cancelledPlan.getConsultationId(),
      patientId: cancelledPlan.getPatientId(),
      specialty: UserSpecialty.WEIGHT,
      eventType: TimelineEventTypeEnum.WORKOUT_CANCELLED,
      resourceId: cancelledPlan.getWorkoutId(),
      snapshot: {
        workoutName: cancelledPlan.getWorkoutSnapshot().name,
        workoutImages: cancelledPlan.getWorkoutSnapshot().images,
        compliance: cancelledPlan.getCompliance(),
      },
    });

    await this.timelineRepository.save(timelineEvent);

    return cancelledPlan;
  }
}
