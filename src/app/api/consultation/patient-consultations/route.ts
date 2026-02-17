import { NextRequest, NextResponse } from 'next/server';
import { GetWeightConsultationUseCase } from '@/application/use-cases/consultation/GetPatientConsultationsUseCase';
import { MongooseConsultationRepository } from '@/infrastructure/repositories/consultation/MongooseConsultationRepository';
import mongoose from 'mongoose';

// @route GET /api/consultation/patient-consultations?patientId=...
// @desc Obtiene la consulta de peso de un paciente específico
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get('patientId');

    // Validate patientId presence
    if (!patientId) {
      return NextResponse.json({ error: 'El patientId es requerido' }, { status: 400 });
    }

    // Validate patientId format for MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return NextResponse.json({ error: 'El formato del patientId no es válido' }, { status: 400 });
    }
    // Dependency Injection
    const repository = new MongooseConsultationRepository();
    const useCase = new GetWeightConsultationUseCase(repository);

    const consultation = await useCase.execute(patientId);

    if (!consultation) {
      return NextResponse.json(
        { message: 'No se encontró una consulta de peso para este paciente' },
        { status: 404 }
      );
    }

    return NextResponse.json(consultation, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching patient weight consultation:', error);

    return NextResponse.json(
      {
        error: 'Error interno del servidor',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
