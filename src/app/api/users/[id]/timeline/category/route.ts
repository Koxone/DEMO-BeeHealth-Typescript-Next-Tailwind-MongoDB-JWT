import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Use Case
import { GetPatientTimelineByCategoryUseCase } from '@/application/use-cases/patient-timeline/GetPatientTimelineByCategoryUseCase ';

// Repository
import { MongoosePatientTimelineRepository } from '@/infrastructure/repositories/patient-timeline/MongoosePatientTimelineRepository';
import { TimelineCategoryEnum } from '@/domain/enums';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id: patientId } = await params;

    if (!patientId) {
      return NextResponse.json({ error: 'El patientId es requerido' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return NextResponse.json({ error: 'El formato del patientId no es válido' }, { status: 400 });
    }

    const searchParams = request.nextUrl.searchParams;
    const tab = searchParams.get('tab');

    let category: TimelineCategoryEnum | undefined;

    if (tab === 'Dietas') {
      category = TimelineCategoryEnum.DIET;
    }

    if (tab === 'Ejercicios') {
      category = TimelineCategoryEnum.WORKOUT;
    }

    if (tab === 'Metas') {
      category = TimelineCategoryEnum.GOAL;
    }

    if (!category) {
      return NextResponse.json([], { status: 200 });
    }

    const timelineRepository = new MongoosePatientTimelineRepository();
    const useCase = new GetPatientTimelineByCategoryUseCase(timelineRepository);

    const timeline = await useCase.execute(patientId, category);

    return NextResponse.json(timeline, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching patient timeline by category:', error);

    return NextResponse.json(
      {
        error: 'Error interno del servidor',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
