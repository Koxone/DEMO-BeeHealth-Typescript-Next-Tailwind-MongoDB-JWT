import { NextResponse } from 'next/server';

// Use case
import { CompleteDietPlanUseCase } from '@/application/use-cases/diet-plan/CompleteDietPlanUseCase';

// Repositories
import { MongooseDietPlanRepository } from '@/infrastructure/repositories/diet-plan/MongooseDietPlanRepository';
import { MongoosePatientTimelineRepository } from '@/infrastructure/repositories/patient-timeline/MongoosePatientTimelineRepository';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const dietPlanRepo = new MongooseDietPlanRepository();
    const timelineRepo = new MongoosePatientTimelineRepository();

    const useCase = new CompleteDietPlanUseCase(dietPlanRepo, timelineRepo);

    await useCase.execute({
      dietPlanId: body.dietPlanId,
      compliance: body.compliance,
    });

    return NextResponse.json(
      {
        message: 'Diet plan completed successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error completing diet:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
