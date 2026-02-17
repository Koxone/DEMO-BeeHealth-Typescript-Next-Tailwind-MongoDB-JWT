import { WorkoutTemplate } from '@/domain/entities/workout/WorkoutTemplate';
import { WorkoutContent } from '@/domain/value-objects/workout/WorkoutContent';
import { WorkoutAssets } from '@/domain/value-objects/workout/WorkoutAssets';
import { WorkoutRepository } from '@/domain/repositories/workout/WorkoutRepository';
import { WorkoutDifficultyEnum, WorkoutCategoryEnum } from '@/domain/enums/';

export interface CreateWorkoutTemplateRequest {
  name: string;
  type: string;
  category: WorkoutCategoryEnum;
  difficulty: WorkoutDifficultyEnum;
  duration: number;
  about: string;
  instructions: string[];
  benefits: string[];
  cautions: string[];
  images: string[];
  video: string;
}

export class CreateWorkoutTemplateUseCase {
  constructor(private readonly repository: WorkoutRepository) {}

  public async execute(request: CreateWorkoutTemplateRequest): Promise<void> {
    const content = WorkoutContent.create(
      request.name,
      request.type,
      request.category,
      request.about,
      request.difficulty,
      request.duration
    );

    const assets = WorkoutAssets.create(
      request.instructions,
      request.images,
      request.video,
      request.benefits,
      request.cautions
    );

    const workout = WorkoutTemplate.create({
      content,
      assets,
      isActive: true,
    });

    // 3. Persistencia
    await this.repository.save(workout);
  }
}
