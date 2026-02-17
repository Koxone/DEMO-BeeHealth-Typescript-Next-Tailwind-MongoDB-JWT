import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Use Cases
import { GetCurrentWeightUseCase } from '@/application/use-cases/consultation/GetCurrentWeight';
import { GetWeightLossUseCase } from '@/application/use-cases/consultation/GetWeightLoss';
import { GetTotalConsultationsNumberUseCase } from '@/application/use-cases/consultation/GetTotalConsultationsNumberUseCase';

// Repositories
import { MongooseConsultationRepository } from '@/infrastructure/repositories/consultation/MongooseConsultationRepository';
import { MongooseClinicalHistoryRepository } from '@/infrastructure/repositories/clinical-history/MongooseClinicalHistoryRepository';
import { GetCurrentSizeUseCase } from '@/application/use-cases/consultation/GetCurrentSize';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: patientId } = await params;

    // Dependency Injection
    const consultationRepo = new MongooseConsultationRepository();
    const clinicalHistoryRepo = new MongooseClinicalHistoryRepository();

    // Instantiate Use Cases
    const getCurrentWeight = new GetCurrentWeightUseCase(consultationRepo);
    const getWeightLoss = new GetWeightLossUseCase(consultationRepo, clinicalHistoryRepo);
    const getTotalConsultations = new GetTotalConsultationsNumberUseCase(consultationRepo);
    const getCurrentSize = new GetCurrentSizeUseCase(consultationRepo);

    // Execute all in parallel for better performance
    const [currentWeight, weightLoss, totalConsultations, currentSize] = await Promise.all([
      getCurrentWeight.execute(patientId),
      getWeightLoss.execute(patientId),
      getTotalConsultations.execute(patientId),
      getCurrentSize.execute(patientId),
    ]);

    // Return unified response
    return NextResponse.json(
      {
        currentWeight,
        weightLoss,
        totalConsultations,
        currentSize,
        patientId,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching patient stats:', error);

    return NextResponse.json(
      {
        error: 'Error interno del servidor al recuperar estadísticas',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
