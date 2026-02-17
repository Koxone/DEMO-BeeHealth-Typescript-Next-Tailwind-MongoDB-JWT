import { WorkoutPlan } from '@/domain/entities/workout-plan/WorkoutPlan';
import { UserSpecialty } from '@/domain/enums/';

export class WorkoutPlanMapper {
  public static toDomain(raw: any): WorkoutPlan {
    return WorkoutPlan.fromPersistence({
      id: raw._id.toString(),
      parentId: raw.parentId ? raw.parentId.toString() : null,
      specialty: raw.specialty as UserSpecialty,
      patientId: raw.patientId.toString(),
      workoutId: raw.workoutId.toString(),
      consultationId: raw.consultationId.toString(),
      startDate: new Date(raw.startDate),
      endDate: new Date(raw.endDate),
      workoutSnapshot: {
        originalWorkoutId: raw.workoutSnapshot.originalWorkoutId,
        name: raw.workoutSnapshot.name,
        type: raw.workoutSnapshot.type,
        category: raw.workoutSnapshot.category,
        difficulty: raw.workoutSnapshot.difficulty,
        duration: raw.workoutSnapshot.duration,
        about: raw.workoutSnapshot.about,
        instructions: raw.workoutSnapshot.instructions,
        benefits: raw.workoutSnapshot.benefits,
        cautions: raw.workoutSnapshot.cautions,
        images: raw.workoutSnapshot.images,
        video: raw.workoutSnapshot.video,
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

  public static toPersistence(domain: WorkoutPlan) {
    const data = domain.toPersistence();
    return {
      ...(domain.getId() && { _id: domain.getId() }),
      ...data,
    };
  }
}
