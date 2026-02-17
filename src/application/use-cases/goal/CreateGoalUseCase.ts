import { Goal } from '@/domain/entities/goal/Goal';
import { PatientTimeline } from '@/domain/entities/patient-timeline/PatientTimeline';
import { TimelineEventTypeEnum, UserSpecialty } from '@/domain/enums/';
import { GoalRepository } from '@/domain/repositories/goal/GoalRepository';
import { PatientTimelineRepository } from '@/domain/repositories/patient-timeline/PatientTimelineRepository';

export class CreateGoalUseCase {
  constructor(
    private readonly goalRepository: GoalRepository,
    private readonly timelineRepository: PatientTimelineRepository
  ) {}

  async execute(input: {
    patientId: string;
    consultationId: string;
    specialty: UserSpecialty;
    initialValue: number;
    targetValue: number;
    notes?: string;
  }): Promise<Goal> {
    // Validate if patient already has an active goal
    const activeGoal = await this.goalRepository.findActiveByPatientId(input.patientId);

    if (activeGoal) {
      throw new Error(
        'El paciente ya tiene una meta activa. Debes completarla o cancelarla antes de crear una nueva.'
      );
    }

    const goalEntity = Goal.create({
      patientId: input.patientId,
      consultationId: input.consultationId,
      specialty: input.specialty,
      initialValue: input.initialValue,
      targetValue: input.targetValue,
      notes: input.notes,
    });

    const savedGoal = await this.goalRepository.save(goalEntity);

    const timelineEvent = PatientTimeline.create({
      consultationId: savedGoal.getConsultationId(),
      patientId: savedGoal.getPatientId(),
      specialty: savedGoal.getSpecialty(),
      eventType: TimelineEventTypeEnum.GOAL_CREATED,
      resourceId: savedGoal.getId(),
      snapshot: {
        specialty: savedGoal.getSpecialty(),
        initialValue: savedGoal.getInitialValue(),
        targetValue: savedGoal.getTargetValue(),
      },
    });

    await this.timelineRepository.save(timelineEvent);

    return savedGoal;
  }
}
