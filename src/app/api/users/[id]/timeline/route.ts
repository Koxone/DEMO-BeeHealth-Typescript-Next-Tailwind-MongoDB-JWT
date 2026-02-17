import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { GetPatientTimelineUseCase } from '@/application/use-cases/patient-timeline/GetPatientTimelineUseCase';
import { MongoosePatientTimelineRepository } from '@/infrastructure/repositories/patient-timeline/MongoosePatientTimelineRepository';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id: patientId } = await params;

    if (!patientId) {
      return NextResponse.json({ error: 'El patientId es requerido' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return NextResponse.json({ error: 'El formato del patientId no es válido' }, { status: 400 });
    }

    const timelineRepository = new MongoosePatientTimelineRepository();
    const useCase = new GetPatientTimelineUseCase(timelineRepository);

    const timeline = await useCase.execute(patientId);

    return NextResponse.json(timeline, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching patient timeline:', error);

    return NextResponse.json(
      {
        error: 'Error interno del servidor',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
