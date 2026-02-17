import { NextResponse } from 'next/server';
import { GetPatientWorkoutPlansUseCase } from '@/application/use-cases/workout-plan/GetPatientWorkoutPlansUseCase';
import { MongooseWorkoutPlanRepository } from '@/infrastructure/repositories/workout-plan/MongooseWorkoutPlanRepository';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: patientId } = await params;
    const workoutPlanRepo = new MongooseWorkoutPlanRepository();
    const useCase = new GetPatientWorkoutPlansUseCase(workoutPlanRepo);

    const result = await useCase.execute({ patientId });

    return NextResponse.json(
      {
        data: result.map((plan) => ({
          id: plan.getId(),
          ...plan.toPersistence(),
        })),
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
