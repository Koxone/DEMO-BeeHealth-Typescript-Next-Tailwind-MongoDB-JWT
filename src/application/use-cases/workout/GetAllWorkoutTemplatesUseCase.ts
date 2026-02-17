import { WorkoutRepository } from '@/domain/repositories/workout/WorkoutRepository';
import { GetWorkoutTemplateResponseType } from './GetWorkoutTemplateUseCase';

export interface GetAllWorkoutTemplatesResponse {
  workouts: GetWorkoutTemplateResponseType[];
}

export class GetAllWorkoutTemplatesUseCase {
  constructor(private readonly repository: WorkoutRepository) {}

  public async execute(): Promise<GetAllWorkoutTemplatesResponse> {
    const templates = await this.repository.findAll();

    if (!templates) {
      throw new Error('Workout templates not found.');
    }

    const data = templates.map((template) => template.toValue());

    return {
      workouts: data.map((item) => ({
        id: item.id,
        name: item.name,
        type: item.type,
        category: item.category,
        difficulty: item.difficulty,
        duration: item.duration,
        about: item.about,
        instructions: item.instructions,
        benefits: item.benefits,
        cautions: item.cautions,
        images: item.images,
        video: item.video,
        isActive: item.isActive,
      })),
    };
  }
}
