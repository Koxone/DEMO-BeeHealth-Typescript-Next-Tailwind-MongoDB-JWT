import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

import { MongooseClinicalHistoryRepository } from '@/infrastructure/repositories/clinical-history/MongooseClinicalHistoryRepository';
import { GetWeightSummaryFromClinicalHistoryUseCase } from '@/application/use-cases';
import { UserRole } from '@/domain/enums/';

// @route    GET /api/clinical-history/my-weight-summary
// @desc     Get weight summary for authenticated patient
// @access   Private (patient)
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('refreshToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      role: UserRole;
    };

    if (payload.role !== UserRole.PATIENT) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const repository = new MongooseClinicalHistoryRepository();
    const useCase = new GetWeightSummaryFromClinicalHistoryUseCase(repository);

    const summary = await useCase.execute(payload.id);

    return NextResponse.json(summary);
  } catch (error: any) {
    const status = error.message?.includes('not found') ? 404 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
