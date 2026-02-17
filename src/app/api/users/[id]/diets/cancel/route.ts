import { NextResponse } from 'next/server';
import { CancelDietPlanUseCase } from '@/application/use-cases/diet-plan/CancelDietPlanUseCase';
import { MongooseDietPlanRepository } from '@/infrastructure/repositories/diet-plan/MongooseDietPlanRepository';
import { MongoosePatientTimelineRepository } from '@/infrastructure/repositories/patient-timeline/MongoosePatientTimelineRepository';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: patientId } = await params;
    const body = await req.json();

    const dietPlanRepo = new MongooseDietPlanRepository();
    const timelineRepo = new MongoosePatientTimelineRepository();

    const useCase = new CancelDietPlanUseCase(dietPlanRepo, timelineRepo);

    const result = await useCase.execute({
      dietPlanId: body.dietPlanId,
      compliance: body.compliance,
    });

    return NextResponse.json(
      {
        message: 'Diet plan cancelled successfully',
        data: result.getId(),
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
