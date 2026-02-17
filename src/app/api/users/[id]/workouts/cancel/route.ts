import { NextResponse } from 'next/server';
import { CancelWorkoutPlanUseCase } from '@/application/use-cases/workout-plan/CancelWorkoutPlanUseCase';
import { MongooseWorkoutPlanRepository } from '@/infrastructure/repositories/workout-plan/MongooseWorkoutPlanRepository';
import { MongoosePatientTimelineRepository } from '@/infrastructure/repositories/patient-timeline/MongoosePatientTimelineRepository';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: patientId } = await params;
    const body = await req.json();

    const workoutPlanRepo = new MongooseWorkoutPlanRepository();
    const timelineRepo = new MongoosePatientTimelineRepository();

    const useCase = new CancelWorkoutPlanUseCase(workoutPlanRepo, timelineRepo);

    const result = await useCase.execute({
      workoutPlanId: body.workoutPlanId,
      compliance: body.compliance,
    });

    return NextResponse.json(
      {
        message: 'Workout plan cancelled successfully',
        data: result.getId(),
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
