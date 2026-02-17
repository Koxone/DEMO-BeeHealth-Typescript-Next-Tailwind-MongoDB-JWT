import { NextResponse } from 'next/server';
import { CompleteWorkoutPlanUseCase } from '@/application/use-cases/workout-plan/CompleteWorkoutPlanUseCase';
import { MongooseWorkoutPlanRepository } from '@/infrastructure/repositories/workout-plan/MongooseWorkoutPlanRepository';
import { MongoosePatientTimelineRepository } from '@/infrastructure/repositories/patient-timeline/MongoosePatientTimelineRepository';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const workoutPlanRepo = new MongooseWorkoutPlanRepository();
    const timelineRepo = new MongoosePatientTimelineRepository();

    const useCase = new CompleteWorkoutPlanUseCase(workoutPlanRepo, timelineRepo);

    await useCase.execute({
      workoutPlanId: body.workoutPlanId,
      compliance: body.compliance,
    });

    return NextResponse.json(
      {
        message: 'Workout plan completed successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error completing workout:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
