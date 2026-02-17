import { NextResponse } from 'next/server';
import { MongooseClinicalHistoryRepository } from '@/infrastructure/repositories/clinical-history/MongooseClinicalHistoryRepository';
import { GetSpecificAnswerFromClinicalHistory } from '@/application/use-cases/clinical-history/GetSpecificAnswerFromClinicalHistory';
import { UserSpecialty } from '@/domain/enums/';

// @route GET /api/clinical-history/[patientId]/answer/[questionId]
// @desc Get a specific answer from a patient's clinical history based on question ID
// @access Public
export async function GET(
  request: Request,
  { params }: { params: { patientId: string; questionId: string } }
) {
  try {
    // Dependencie Injection
    const repository = new MongooseClinicalHistoryRepository();
    const useCase = new GetSpecificAnswerFromClinicalHistory(repository);

    const { patientId, questionId } = await params;

    const answer = await useCase.execute(patientId, UserSpecialty.WEIGHT, parseInt(questionId));

    // 3. Respuesta serializada
    return NextResponse.json(answer.toPersistence());
  } catch (error: any) {
    console.error(`[GET_SPECIFIC_ANSWER_ERROR]: ${error.message}`);

    const status = error.message.includes('not found') ? 404 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
