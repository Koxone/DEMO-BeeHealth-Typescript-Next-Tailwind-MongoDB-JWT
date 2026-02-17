import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { GetPatientConsultationsWithDietsAndWorkoutsUseCase } from '@/application/use-cases/consultation/GetPatientConsultationsWithDietPlansUseCase';
import { MongooseConsultationRepository } from '@/infrastructure/repositories/consultation/MongooseConsultationRepository';
import { MongooseDietPlanRepository } from '@/infrastructure/repositories/diet-plan/MongooseDietPlanRepository';
import { MongooseWorkoutPlanRepository } from '@/infrastructure/repositories/workout-plan/MongooseWorkoutPlanRepository';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'El patientId es requerido' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'El formato del patientId no es válido' }, { status: 400 });
    }

    const consultationRepository = new MongooseConsultationRepository();
    const dietPlanRepository = new MongooseDietPlanRepository();
    const workoutPlanRepository = new MongooseWorkoutPlanRepository();

    const useCase = new GetPatientConsultationsWithDietsAndWorkoutsUseCase(
      consultationRepository,
      dietPlanRepository,
      workoutPlanRepository
    );

    const history = await useCase.execute(id);

    return NextResponse.json(history, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching patient clinical history:', error);

    return NextResponse.json(
      {
        error: 'Error interno del servidor',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
