import { NextResponse } from 'next/server';
import { AssignWorkoutToPatientUseCase } from '@/application/use-cases/workout-plan/AssignWorkoutToPatientUseCase';
import { MongooseWorkoutPlanRepository } from '@/infrastructure/repositories/workout-plan/MongooseWorkoutPlanRepository';
import { MongoosePatientTimelineRepository } from '@/infrastructure/repositories/patient-timeline/MongoosePatientTimelineRepository';
import { MongoWorkoutRepository } from '@/infrastructure/repositories/workout/MongoWorkoutRepository';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Repositorios
    const workoutPlanRepo = new MongooseWorkoutPlanRepository();
    const workoutRepo = new MongoWorkoutRepository();
    const timelineRepo = new MongoosePatientTimelineRepository();

    // Use case
    const useCase = new AssignWorkoutToPatientUseCase(workoutPlanRepo, workoutRepo, timelineRepo);

    const result = await useCase.execute({
      patientId: id,
      consultationId: body.consultationId,
      specialty: body.specialty,
      workoutId: body.workoutTemplateId, 
      durationDays: body.durationDays,
    });

    return NextResponse.json(
      {
        message: 'Workout assigned successfully',
        data: result.getId(),
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error assigning workout:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
