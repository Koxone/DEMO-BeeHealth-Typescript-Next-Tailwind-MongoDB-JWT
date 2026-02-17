import { WorkoutCategoryEnum, WorkoutDifficultyEnum } from '@/domain/enums/';

export class WorkoutContent {
  private constructor(
    public readonly name: string,
    public readonly type: string,
    public readonly category: WorkoutCategoryEnum,
    public readonly about: string,
    public readonly difficulty: WorkoutDifficultyEnum,
    public readonly duration: number
  ) {}

  public static create(
    name: string,
    type: string,
    category: WorkoutCategoryEnum,
    about: string,
    difficulty: WorkoutDifficultyEnum,
    duration: number
  ): WorkoutContent {
    if (!name || name.trim().length < 3) throw new Error('Workout name is too short.');
    if (duration <= 0) throw new Error('Duration must be a positive number.');

    const validDifficulties = Object.values(WorkoutDifficultyEnum);
    if (!validDifficulties.includes(difficulty)) throw new Error('Invalid difficulty level.');

    return new WorkoutContent(
      name.trim(),
      type.trim(),
      category,
      about.trim(),
      difficulty,
      duration
    );
  }
}
