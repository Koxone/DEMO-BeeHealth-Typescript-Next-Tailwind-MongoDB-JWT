import { GetPatientWeightHistoryUseCase } from '@/application/use-cases/consultation/GetPatientWeightHistoryUseCase';
import { NextRequest, NextResponse } from 'next/server';
import { MongooseConsultationRepository } from '@/infrastructure/repositories/consultation/MongooseConsultationRepository';
import mongoose from 'mongoose';

// @route GET /api/users/[id]/consultation/weight-history
// @desc Get weight history for a specific patient
// @access Private
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id: patientId } = await params;

    const repository = new MongooseConsultationRepository();
    const useCase = new GetPatientWeightHistoryUseCase(repository);

    const weightHistory = await useCase.execute(patientId);

    return NextResponse.json(weightHistory, { status: 200 });
  } catch (error: any) {
    console.error('Error en Route Handler:', error);
    return NextResponse.json(
      { error: 'Error al obtener historial', details: error.message },
      { status: 500 }
    );
  }
}
