import { DietPlan } from '@/domain/entities/diet-plan/DietPlan';
import { UserSpecialty } from '@/domain/enums/';

export class DietPlanMapper {
  public static toDomain(raw: any): DietPlan {
    return DietPlan.fromPersistence({
      id: raw._id.toString(),
      parentId: raw.parentId ? raw.parentId.toString() : null,
      specialty: raw.specialty as UserSpecialty,
      patientId: raw.patientId.toString(),
      dietId: raw.dietId.toString(),
      consultationId: raw.consultationId.toString(),
      startDate: new Date(raw.startDate),
      endDate: new Date(raw.endDate),
      dietSnapshot: {
        originalDietId: raw.dietSnapshot.originalDietId,
        name: raw.dietSnapshot.name,
        category: raw.dietSnapshot.category,
        description: raw.dietSnapshot.description,
        instructions: raw.dietSnapshot.instructions,
        allowedFoods: raw.dietSnapshot.allowedFoods,
        forbiddenFoods: raw.dietSnapshot.forbiddenFoods,
        allowedLiquids: raw.dietSnapshot.allowedLiquids,
        forbiddenLiquids: raw.dietSnapshot.forbiddenLiquids,
        ingredients: raw.dietSnapshot.ingredients,
        images: raw.dietSnapshot.images,
      },
      status: raw.status,
      compliance: {
        status: raw.compliance?.status,
        rating: raw.compliance?.rating || 0,
        doctorNotes: raw.compliance?.doctorNotes || '',
      },
      createdAt: new Date(raw.createdAt),
      updatedAt: new Date(raw.updatedAt),
    });
  }

  public static toPersistence(domain: DietPlan) {
    const data = domain.toPersistence();
    return {
      ...(domain.getId() && { _id: domain.getId() }),
      ...data,
    };
  }
}
