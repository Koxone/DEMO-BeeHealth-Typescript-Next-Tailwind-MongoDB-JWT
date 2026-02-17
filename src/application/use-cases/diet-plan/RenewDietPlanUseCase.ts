import { DietPlan } from '@/domain/entities/diet-plan/DietPlan';
import { PatientTimeline } from '@/domain/entities/patient-timeline/PatientTimeline';
import { UserSpecialty, ComplianceStatusEnum, TimelineEventTypeEnum } from '@/domain/enums/';
import { DietPlanRepository } from '@/domain/repositories/diet-plan/DietPlanRepository';
import { PatientTimelineRepository } from '@/domain/repositories/patient-timeline/PatientTimelineRepository';

export class RenewDietPlanUseCase {
  constructor(
    private readonly dietPlanRepository: DietPlanRepository,
    private readonly timelineRepository: PatientTimelineRepository
  ) {}

  async execute(input: {
    dietPlanId: string;
    durationDays: number;
    compliance: { status: ComplianceStatusEnum; rating: number; doctorNotes: string };
    newConsultationId?: string;
  }): Promise<DietPlan> {
    const currentPlan = await this.dietPlanRepository.findById(input.dietPlanId);
    if (!currentPlan) throw new Error('Diet plan not found');

    const newEndDate = new Date();
    newEndDate.setDate(newEndDate.getDate() + input.durationDays);

    const renewedPlan = currentPlan.renew(newEndDate, input.compliance, input.newConsultationId);
    await this.dietPlanRepository.saveEvolution(currentPlan, renewedPlan);

    const timelineEvent = PatientTimeline.create({
      consultationId: input.newConsultationId ?? currentPlan.getConsultationId(),
      patientId: currentPlan.getPatientId(),
      specialty: UserSpecialty.WEIGHT,
      eventType: TimelineEventTypeEnum.DIET_RENEWED,
      resourceId: renewedPlan.getDietId(),
      snapshot: {
        dietName: renewedPlan.getDietSnapshot().name,
        dietImages: renewedPlan.getDietSnapshot().images,
        previousPlanId: currentPlan.getId(),
        compliance: currentPlan.getCompliance(),
      },
    });

    await this.timelineRepository.save(timelineEvent);

    return renewedPlan;
  }
}
