import { NextResponse } from 'next/server';
import { RenewWorkoutPlanUseCase } from '@/application/use-cases/workout-plan/RenewWorkoutPlanUseCase';
import { MongooseWorkoutPlanRepository } from '@/infrastructure/repositories/workout-plan/MongooseWorkoutPlanRepository';
import { MongoosePatientTimelineRepository } from '@/infrastructure/repositories/patient-timeline/MongoosePatientTimelineRepository';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: patientId } = await params;
    const body = await req.json();

    const workoutPlanRepo = new MongooseWorkoutPlanRepository();
    const timelineRepo = new MongoosePatientTimelineRepository();

    const useCase = new RenewWorkoutPlanUseCase(workoutPlanRepo, timelineRepo);

    const result = await useCase.execute({
      workoutPlanId: body.workoutPlanId,
      durationDays: body.durationDays,
      compliance: body.compliance,
      newConsultationId: body.newConsultationId,
    });

    return NextResponse.json(
      {
        message: 'Workout plan renewed successfully',
        data: result.getId(),
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
