import { NextResponse } from 'next/server';
import { FailGoalUseCase } from '@/application/use-cases/goal/FailGoalUseCase';
import { MongooseGoalRepository } from '@/infrastructure/repositories/goal/MongooseGoalRepository';
import { MongoosePatientTimelineRepository } from '@/infrastructure/repositories/patient-timeline/MongoosePatientTimelineRepository';
import { MongooseConsultationRepository } from '@/infrastructure/repositories/consultation/MongooseConsultationRepository';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    if (!body.goalId) {
      return NextResponse.json({ error: 'goalId is required' }, { status: 400 });
    }

    const goalRepo = new MongooseGoalRepository();
    const timelineRepo = new MongoosePatientTimelineRepository();
    const consultationRepo = new MongooseConsultationRepository();

    const useCase = new FailGoalUseCase(goalRepo, timelineRepo, consultationRepo);

    await useCase.execute({
      goalId: body.goalId,
      consultationId: body.consultationId,
    });

    return NextResponse.json({ message: 'Goal marked as failed' }, { status: 200 });
  } catch (error: any) {
    console.error(' [FAIL_GOAL_ERROR]:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
