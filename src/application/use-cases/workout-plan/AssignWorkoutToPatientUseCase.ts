import { WorkoutPlan } from '@/domain/entities/workout-plan/WorkoutPlan';
import { PatientTimeline } from '@/domain/entities/patient-timeline/PatientTimeline';
import { UserSpecialty, TimelineEventTypeEnum } from '@/domain/enums/';
import { WorkoutPlanRepository } from '@/domain/repositories/workout-plan/WorkoutPlanRepository';
import { WorkoutRepository } from '@/domain/repositories/workout/WorkoutRepository';
import { PatientTimelineRepository } from '@/domain/repositories/patient-timeline/PatientTimelineRepository';

export class AssignWorkoutToPatientUseCase {
  constructor(
    private readonly workoutPlanRepository: WorkoutPlanRepository,
    private readonly workoutRepository: WorkoutRepository,
    private readonly timelineRepository: PatientTimelineRepository
  ) {}

  async execute(input: {
    consultationId: string;
    patientId: string;
    specialty: UserSpecialty;
    workoutId: string;
    durationDays: number;
  }): Promise<WorkoutPlan> {
    const template = await this.workoutRepository.findById(input.workoutId);
    if (!template) throw new Error('Workout template not found');

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + input.durationDays);

    const workoutPlan = WorkoutPlan.create({
      consultationId: input.consultationId,
      patientId: input.patientId,
      workoutId: template.getId(),
      startDate,
      endDate,
      workoutSnapshot: {
        originalWorkoutId: template.getId(),
        name: template.getName(),
        type: (template as any).type,
        category: template.getCategory(),
        difficulty: template.getDifficulty(),
        duration: (template as any).duration,
        about: (template as any).about,
        instructions: template.getInstructions(),
        benefits: (template as any).benefits || [],
        cautions: (template as any).cautions || [],
        images: template.getImages(),
        video: (template as any).video || '',
      },
    });

    await this.workoutPlanRepository.save(workoutPlan);

    const timelineEvent = PatientTimeline.create({
      consultationId: input.consultationId,
      patientId: input.patientId,
      specialty: input.specialty,
      eventType: TimelineEventTypeEnum.WORKOUT_ASSIGNED,
      resourceId: template.getId(),
      snapshot: {
        workoutName: workoutPlan.getWorkoutSnapshot().name,
        workoutImages: workoutPlan.getWorkoutSnapshot().images,
      },
    });

    await this.timelineRepository.save(timelineEvent);

    return workoutPlan;
  }
}
