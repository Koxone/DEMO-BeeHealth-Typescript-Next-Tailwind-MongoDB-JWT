import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Use Cases
import { GetLatestConsultationUseCase } from '@/application/use-cases/consultation/GetLatestConsultationUseCase';

// Repositories
import { MongooseConsultationRepository } from '@/infrastructure/repositories/consultation/MongooseConsultationRepository';

// Enums
import { UserSpecialty } from '@/domain/enums/';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: patientId } = await params;

    // Validate patientId
    if (!patientId || !mongoose.Types.ObjectId.isValid(patientId)) {
      return NextResponse.json(
        { error: 'El patientId proporcionado no es válido' },
        { status: 400 }
      );
    }

    // Dependency Injection
    const consultationRepo = new MongooseConsultationRepository();

    // Instantiate Use Case
    const getLatestConsultation = new GetLatestConsultationUseCase(consultationRepo);

    // Execute (Defaulting to WEIGHT specialty)
    const latestConsultation = await getLatestConsultation.execute(patientId, UserSpecialty.WEIGHT);

    if (!latestConsultation) {
      return NextResponse.json(
        { message: 'No se encontraron consultas para este paciente' },
        { status: 404 }
      );
    }

    return NextResponse.json(latestConsultation, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching latest consultation:', error);

    return NextResponse.json(
      {
        error: 'Error interno del servidor',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
