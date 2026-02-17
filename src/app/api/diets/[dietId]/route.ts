import { NextResponse } from 'next/server';
import { MongoDietTemplateRepository } from '@/infrastructure/repositories/diet/MongoDietTemplateRepository';
import { GetDietTemplateUseCase } from '@/application/use-cases/diet/GetDietTemplateUseCase';

export async function GET(request: Request, { params }: { params: { dietId: string } }) {
  try {
    const { dietId } = await params;

    if (!dietId) {
      return NextResponse.json({ error: 'Diet ID is required' }, { status: 400 });
    }

    const repository = new MongoDietTemplateRepository();
    const useCase = new GetDietTemplateUseCase(repository);

    const template = await useCase.execute(dietId);

    return NextResponse.json(template, { status: 200 });
  } catch (error: any) {
    const status = error.message === 'Diet template not found.' ? 404 : 400;
    return NextResponse.json({ error: error.message }, { status });
  }
}
