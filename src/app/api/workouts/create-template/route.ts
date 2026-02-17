import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { MongoWorkoutRepository } from '@/infrastructure/repositories/workout/MongoWorkoutRepository';
import { CreateWorkoutTemplateUseCase } from '@/application/use-cases/workout/CreateWorkoutTemplateUseCase';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const repository = new MongoWorkoutRepository();
    const useCase = new CreateWorkoutTemplateUseCase(repository);

    await useCase.execute({
      name: body.name,
      type: body.type,
      category: body.category,
      difficulty: body.difficulty,
      duration: body.duration,
      about: body.about,
      instructions: body.instructions,
      benefits: body.benefits,
      cautions: body.cautions,
      images: body.images,
      video: body.video,
    });

    revalidateTag('workout-templates', 'max');

    return NextResponse.json({ message: 'Workout template created successfully' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
