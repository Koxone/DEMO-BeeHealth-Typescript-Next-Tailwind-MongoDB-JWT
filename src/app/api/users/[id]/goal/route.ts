import { NextResponse } from 'next/server';
import { GetPatientGoalsUseCase } from '@/application/use-cases/goal/GetPatientGoalsUseCase';
import { MongooseGoalRepository } from '@/infrastructure/repositories/goal/MongooseGoalRepository';
import { MongooseConsultationRepository } from '@/infrastructure/repositories/consultation/MongooseConsultationRepository';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: patientId } = await params;

    const { searchParams } = new URL(req.url);
    const consultationId = searchParams.get('consultationId');

    if (!patientId) {
      return NextResponse.json({ error: 'Patient ID is required' }, { status: 400 });
    }

    const goalRepository = new MongooseGoalRepository();
    const consultationRepository = new MongooseConsultationRepository();
    const useCase = new GetPatientGoalsUseCase(goalRepository, consultationRepository);

    // Pasamos el consultationId al useCase
    const goals = await useCase.execute(patientId, consultationId || undefined);

    // 'goals' ya son objetos planos (DTOs), los enviamos directamente
    return NextResponse.json({ data: goals }, { status: 200 });
  } catch (error: any) {
    console.error(' [GET_GOALS_ERROR]:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
