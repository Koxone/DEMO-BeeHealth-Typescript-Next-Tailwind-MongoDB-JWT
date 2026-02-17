import { WorkoutCategoryEnum, WorkoutDifficultyEnum } from '@/domain/enums/';
import { WorkoutRepository } from '@/domain/repositories/workout/WorkoutRepository';

export interface GetWorkoutTemplateResponseType {
  id: string;
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
  isActive: boolean;
}

export class GetWorkoutTemplateUseCase {
  constructor(private readonly repository: WorkoutRepository) {}

  public async execute(id: string): Promise<GetWorkoutTemplateResponseType> {
    const workout = await this.repository.findById(id);

    if (!workout) {
      throw new Error('Workout template not found.');
    }

    const data = workout.toValue();

    return {
      id: data.id,
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
