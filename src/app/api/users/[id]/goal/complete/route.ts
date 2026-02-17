import { NextResponse } from 'next/server';
import { CompleteGoalUseCase } from '@/application/use-cases/goal/CompleteGoalUseCase';
import { MongooseGoalRepository } from '@/infrastructure/repositories/goal/MongooseGoalRepository';
import { MongoosePatientTimelineRepository } from '@/infrastructure/repositories/patient-timeline/MongoosePatientTimelineRepository';
import { MongooseConsultationRepository } from '@/infrastructure/repositories/consultation/MongooseConsultationRepository';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    if (!body.goalId) {
      return NextResponse.json({ error: "El campo 'goalId' es obligatorio." }, { status: 400 });
    }

    const goalRepo = new MongooseGoalRepository();
    const timelineRepo = new MongoosePatientTimelineRepository();
    const consultationRepo = new MongooseConsultationRepository();
    const useCase = new CompleteGoalUseCase(goalRepo, timelineRepo, consultationRepo);

    await useCase.execute({
      goalId: body.goalId,
      consultationId: body.consultationId,
    });

    return NextResponse.json({ message: 'Goal completed successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
