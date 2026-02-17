import { DietPlan } from '@/domain/entities/diet-plan/DietPlan';
import { PatientTimeline } from '@/domain/entities/patient-timeline/PatientTimeline';
import { UserSpecialty, ComplianceStatusEnum, TimelineEventTypeEnum } from '@/domain/enums/';

import { DietPlanRepository } from '@/domain/repositories/diet-plan/DietPlanRepository';
import { PatientTimelineRepository } from '@/domain/repositories/patient-timeline/PatientTimelineRepository';

export class CompleteDietPlanUseCase {
  constructor(
    private readonly dietPlanRepository: DietPlanRepository,
    private readonly timelineRepository: PatientTimelineRepository
  ) {}

  async execute(input: {
    dietPlanId: string;
    compliance: { status: ComplianceStatusEnum; rating: number; doctorNotes: string };
  }): Promise<void> {
    const dietPlan = await this.dietPlanRepository.findById(input.dietPlanId);
    if (!dietPlan) throw new Error('Diet plan not found');

    dietPlan.complete(input.compliance);
    await this.dietPlanRepository.update(dietPlan);

    const timelineEvent = PatientTimeline.create({
      consultationId: dietPlan.getConsultationId(),
      patientId: dietPlan.getPatientId(),
      specialty: UserSpecialty.WEIGHT,
      eventType: TimelineEventTypeEnum.DIET_COMPLETED,
      resourceId: dietPlan.getDietId(),
      snapshot: {
        dietName: dietPlan.getDietSnapshot().name,
        dietImages: dietPlan.getDietSnapshot().images,
        completedAt: dietPlan.getUpdatedAt(),
        compliance: dietPlan.getCompliance(),
      },
    });

    await this.timelineRepository.save(timelineEvent);
  }
}
