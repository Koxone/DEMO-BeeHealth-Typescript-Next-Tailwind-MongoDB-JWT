import { NextRequest, NextResponse } from 'next/server';
import { GetWeightClinicalHistoryUseCase } from '@/application/use-cases/clinical-history/GetPatientClinicalHistoryUseCase';
import { MongooseClinicalHistoryRepository } from '@/infrastructure/repositories/clinical-history/MongooseClinicalHistoryRepository';

// @route GET /api/clinical-history/[patientId]
// @desc Get weight clinical history for a patient
// @access Public
export async function GET(request: NextRequest, { params }: { params: { patientId: string } }) {
  try {
    const { patientId } = await params;

    if (!patientId) {
      return NextResponse.json({ error: 'patientId es requerido' }, { status: 400 });
    }

    const repository = new MongooseClinicalHistoryRepository();
    const useCase = new GetWeightClinicalHistoryUseCase(repository);

    const result = await useCase.execute(patientId);

    if (!result) {
      return NextResponse.json(
        { error: 'No se encontró historial clínico para este paciente' },
        { status: 404 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error getting weight clinical history:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// Usage example: /api/clinical-history/weight/12345
// Response: { clinical history data for patient 12345 }
// try {
//   const response = await fetch('/api/clinical-history/weight/12345');
//   const data = await response.json();
//   console.log(data);
// } catch (error) {
// }
