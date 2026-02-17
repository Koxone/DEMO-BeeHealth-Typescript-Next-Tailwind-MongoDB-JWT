import { NextResponse } from 'next/server';
import { CreateGoalUseCase } from '@/application/use-cases/goal/CreateGoalUseCase';
import { MongooseGoalRepository } from '@/infrastructure/repositories/goal/MongooseGoalRepository';
import { MongoosePatientTimelineRepository } from '@/infrastructure/repositories/patient-timeline/MongoosePatientTimelineRepository';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: patientId } = await params;
    const body = await req.json();

    const goalRepo = new MongooseGoalRepository();
    const timelineRepo = new MongoosePatientTimelineRepository();
    const useCase = new CreateGoalUseCase(goalRepo, timelineRepo);

    const result = await useCase.execute({
      patientId,
      consultationId: body.consultationId,
      specialty: body.specialty,
      initialValue: body.initialValue,
      targetValue: body.targetValue,
      notes: body.notes,
    });

    return NextResponse.json(
      { message: 'Goal created successfully', data: result.getId() },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
