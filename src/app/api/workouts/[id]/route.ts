import { NextResponse } from 'next/server';
import { MongoWorkoutRepository } from '@/infrastructure/repositories/workout/MongoWorkoutRepository';
import { GetWorkoutTemplateUseCase } from '@/application/use-cases/workout/GetWorkoutTemplateUseCase';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Workout ID is required' }, { status: 400 });
    }

    const repository = new MongoWorkoutRepository();
    const useCase = new GetWorkoutTemplateUseCase(repository);

    const template = await useCase.execute(id);

    return NextResponse.json(template, { status: 200 });
  } catch (error: any) {
    const status = error.message === 'Workout template not found.' ? 404 : 400;
    return NextResponse.json({ error: error.message }, { status });
  }
}
