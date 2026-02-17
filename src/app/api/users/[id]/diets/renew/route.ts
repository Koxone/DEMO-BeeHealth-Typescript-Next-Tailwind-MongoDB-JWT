import { NextResponse } from 'next/server';
import { RenewDietPlanUseCase } from '@/application/use-cases/diet-plan/RenewDietPlanUseCase';
import { MongooseDietPlanRepository } from '@/infrastructure/repositories/diet-plan/MongooseDietPlanRepository';
import { MongoosePatientTimelineRepository } from '@/infrastructure/repositories/patient-timeline/MongoosePatientTimelineRepository';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: patientId } = await params;
    const body = await req.json();

    const dietPlanRepo = new MongooseDietPlanRepository();
    const timelineRepo = new MongoosePatientTimelineRepository();

    const useCase = new RenewDietPlanUseCase(dietPlanRepo, timelineRepo);

    const result = await useCase.execute({
      dietPlanId: body.dietPlanId,
      durationDays: body.durationDays,
      compliance: body.compliance,
      newConsultationId: body.newConsultationId,
    });

    return NextResponse.json(
      {
        message: 'Diet plan renewed successfully',
        data: result.getId(),
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
