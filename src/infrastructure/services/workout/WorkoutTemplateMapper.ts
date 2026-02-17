import { WorkoutTemplate } from '@/domain/entities/workout/WorkoutTemplate';
import { WorkoutContent } from '@/domain/value-objects/workout/WorkoutContent';
import { WorkoutAssets } from '@/domain/value-objects/workout/WorkoutAssets';

export class WorkoutMapper {
  public static toDomain(raw: any): WorkoutTemplate {
    const content = WorkoutContent.create(
      raw.name,
      raw.type,
      raw.category,
      raw.about,
      raw.difficulty,
      raw.duration
    );

    const assets = WorkoutAssets.create(
      raw.instructions,
      raw.images,
      raw.video,
      raw.benefits,
      raw.cautions
    );

    return WorkoutTemplate.fromPersistence(raw._id.toString(), {
      content,
      assets,
      isActive: raw.isActive ?? true,
    });
  }

  public static toPersistence(workout: WorkoutTemplate): any {
    const data = workout.toValue();

    return {
      _id: data.id,
      name: data.name,
      type: data.type,
      category: data.category,
      difficulty: data.difficulty,
      duration: data.duration,
      about: data.about,
      instructions: data.instructions,
      benefits: data.benefits,
      cautions: data.cautions,
      images: data.images,
      video: data.video,
      isActive: data.isActive,
    };
  }
}
