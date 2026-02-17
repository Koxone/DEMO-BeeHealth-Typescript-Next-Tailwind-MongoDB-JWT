import { DietPlan } from '@/domain/entities/diet-plan/DietPlan';
import { PatientTimeline } from '@/domain/entities/patient-timeline/PatientTimeline';
import { UserSpecialty, TimelineEventTypeEnum } from '@/domain/enums/';
import { DietPlanRepository } from '@/domain/repositories/diet-plan/DietPlanRepository';
import { DietTemplateRepository } from '@/domain/repositories/diet/DietTemplateRepository';
import { PatientTimelineRepository } from '@/domain/repositories/patient-timeline/PatientTimelineRepository';

export class AssignDietToPatientUseCase {
  constructor(
    private readonly dietPlanRepository: DietPlanRepository,
    private readonly dietTemplateRepository: DietTemplateRepository,
    private readonly timelineRepository: PatientTimelineRepository
  ) {}

  async execute(input: {
    consultationId: string;
    patientId: string;
    specialty: UserSpecialty;
    dietTemplateId: string;
    durationDays: number;
  }): Promise<DietPlan> {
    // Get diet template
    const template = await this.dietTemplateRepository.findById(input.dietTemplateId);
    if (!template) throw new Error('Diet template not found');

    // Calculate start and end dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + input.durationDays);

    // Create diet plan entity
    const dietPlan = DietPlan.create({
      consultationId: input.consultationId,
      patientId: input.patientId,
      dietId: template.getId(),
      startDate,
      endDate,
      dietSnapshot: {
        originalDietId: template.getId(),
        name: template.getName(),
        category: template.getCategory(),
        description: template.getDescription(),
        instructions: template.getInstructions(),
        allowedFoods: {
          items: template.getAllowedFoods().items,
          note: template.getAllowedFoods().note ?? '',
        },
        forbiddenFoods: {
          items: template.getForbiddenFoods().items,
          note: template.getForbiddenFoods().note ?? '',
        },
        allowedLiquids: {
          items: template.getAllowedLiquids().items,
          note: template.getAllowedLiquids().note ?? '',
        },
        forbiddenLiquids: {
          items: template.getForbiddenLiquids().items,
          note: template.getForbiddenLiquids().note ?? '',
        },
        ingredients: template.getIngredients(),
        images: template.getImages(),
      },
    });

    // To Persistence and save using repository
    await this.dietPlanRepository.save(dietPlan);

    // Create timeline event
    const timelineEvent = PatientTimeline.create({
      consultationId: input.consultationId,
      patientId: input.patientId,
      specialty: input.specialty,
      eventType: TimelineEventTypeEnum.DIET_ASSIGNED,
      resourceId: template.getId(),
      snapshot: {
        dietName: dietPlan.getDietSnapshot().name,
        dietImages: dietPlan.getDietSnapshot().images,
      },
    });

    // Then use the save method of the repository passing the entity
    await this.timelineRepository.save(timelineEvent);

    return dietPlan;
  }
}
