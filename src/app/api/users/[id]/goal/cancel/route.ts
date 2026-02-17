import { NextResponse } from 'next/server';
import { CancelGoalUseCase } from '@/application/use-cases/goal/CancelGoalUseCase';
import { MongooseGoalRepository } from '@/infrastructure/repositories/goal/MongooseGoalRepository';
import { MongoosePatientTimelineRepository } from '@/infrastructure/repositories/patient-timeline/MongoosePatientTimelineRepository';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json();

    const goalRepo = new MongooseGoalRepository();
    const timelineRepo = new MongoosePatientTimelineRepository();
    const useCase = new CancelGoalUseCase(goalRepo, timelineRepo);

    await useCase.execute(body.goalId);

    return NextResponse.json({ message: 'Goal cancelled successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
