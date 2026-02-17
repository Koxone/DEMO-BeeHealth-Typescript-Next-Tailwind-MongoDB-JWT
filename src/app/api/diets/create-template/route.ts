import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { MongoDietTemplateRepository } from '@/infrastructure/repositories/diet/MongoDietTemplateRepository';
import { CreateDietTemplateUseCase } from '@/application/use-cases/diet/CreateDietTemplateUseCase';
import { CreateDietTemplateSchema } from '@/application/validators/diet/CreateDietTemplate.schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = CreateDietTemplateSchema.parse(body);

    const repository = new MongoDietTemplateRepository();
    const useCase = new CreateDietTemplateUseCase(repository);

    await useCase.execute(data);

    revalidateTag('diet-templates', 'max');

    return NextResponse.json({ message: 'Diet template created successfully' }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors }, { status: 422 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
