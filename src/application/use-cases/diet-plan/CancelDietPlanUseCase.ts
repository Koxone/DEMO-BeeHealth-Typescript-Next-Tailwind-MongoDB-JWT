import { DietPlan } from '@/domain/entities/diet-plan/DietPlan';
import { PatientTimeline } from '@/domain/entities/patient-timeline/PatientTimeline';
import { UserSpecialty, ComplianceStatusEnum, TimelineEventTypeEnum } from '@/domain/enums/';
import { DietPlanRepository } from '@/domain/repositories/diet-plan/DietPlanRepository';
import { PatientTimelineRepository } from '@/domain/repositories/patient-timeline/PatientTimelineRepository';

export class CancelDietPlanUseCase {
  constructor(
    private readonly dietPlanRepository: DietPlanRepository,
    private readonly timelineRepository: PatientTimelineRepository
  ) {}

  async execute(input: {
    dietPlanId: string;
    compliance: {
      status: ComplianceStatusEnum;
      rating: number;
      doctorNotes: string;
    };
  }): Promise<DietPlan> {
    // Find current plan
    const currentPlan = await this.dietPlanRepository.findById(input.dietPlanId);
    if (!currentPlan) throw new Error('Diet plan not found');

    // Cancel plan
    const cancelledPlan = currentPlan.cancel(input.compliance);

    // Persist evolution
    await this.dietPlanRepository.saveEvolution(currentPlan, cancelledPlan);

    // Create timeline event
    const timelineEvent = PatientTimeline.create({
      consultationId: cancelledPlan.getConsultationId(),
      patientId: cancelledPlan.getPatientId(),
      specialty: UserSpecialty.WEIGHT,
      eventType: TimelineEventTypeEnum.DIET_CANCELLED,
      resourceId: cancelledPlan.getDietId(),
      snapshot: {
        dietName: cancelledPlan.getDietSnapshot().name,
        dietImages: cancelledPlan.getDietSnapshot().images,
        compliance: cancelledPlan.getCompliance(),
      },
    });

    // Save timeline
    await this.timelineRepository.save(timelineEvent);

    return cancelledPlan;
  }
}
