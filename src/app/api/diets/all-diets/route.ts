import { GetAllDietTemplatesUseCase } from '@/application/use-cases/diet/GetAllDietTemplatesUseCase';
import { MongoDietTemplateRepository } from '@/infrastructure/repositories/diet/MongoDietTemplateRepository';
import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

const getCachedDiets = unstable_cache(
  async () => {
    const repository = new MongoDietTemplateRepository();
    const useCase = new GetAllDietTemplatesUseCase(repository);
    return await useCase.execute();
  },
  ['all-diet-templates-key'],
  { tags: ['diet-templates'] }
);

export async function GET() {
  try {
    const result = await getCachedDiets();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch diet templates' }, { status: 500 });
  }
}
