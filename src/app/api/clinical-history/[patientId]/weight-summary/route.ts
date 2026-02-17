import { NextResponse } from 'next/server';
import { MongooseClinicalHistoryRepository } from '@/infrastructure/repositories/clinical-history/MongooseClinicalHistoryRepository';
import { GetWeightSummaryFromClinicalHistoryUseCase } from '@/application/use-cases';

// @route GET /api/clinical-history/[patientId]/weight-summary
// @desc Get weight summary for a specific patient
// @access Public
export async function GET(
  request: Request,
  { params }: { params: Promise<{ patientId: string }> }
) {
  try {
    const { patientId } = await params;

    const repository = new MongooseClinicalHistoryRepository();
    const useCase = new GetWeightSummaryFromClinicalHistoryUseCase(repository);

    const summary = await useCase.execute(patientId);

    return NextResponse.json(summary);
  } catch (error: any) {
    const status = error.message.includes('not found') ? 404 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}

// Usage example:
// try {
//   const summary = await useCase.execute('patient123');
//   console.log(summary);
// } catch (error) {

// }
