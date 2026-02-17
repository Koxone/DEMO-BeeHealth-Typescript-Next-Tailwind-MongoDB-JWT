import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { MongoWorkoutRepository } from '@/infrastructure/repositories/workout/MongoWorkoutRepository';
import { GetAllWorkoutTemplatesUseCase } from '@/application/use-cases/workout/GetAllWorkoutTemplatesUseCase';

const getCachedWorkouts = unstable_cache(
  async () => {
    const repository = new MongoWorkoutRepository();
    const useCase = new GetAllWorkoutTemplatesUseCase(repository);
    return await useCase.execute();
  },
  ['all-workouts-templates-key'],
  { tags: ['workout-templates'] }
);

export async function GET() {
  try {
    const result = await getCachedWorkouts();

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    const status = error.message === 'Workout templates not found.' ? 404 : 400;
    return NextResponse.json({ error: error.message }, { status });
  }
}
