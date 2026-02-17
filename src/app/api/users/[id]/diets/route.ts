import { NextResponse } from 'next/server';

// Use case
import { GetPatientDietPlansUseCase } from '@/application/use-cases/diet-plan/GetPatientDietPlansUseCase';

// Repositories
import { MongooseDietPlanRepository } from '@/infrastructure/repositories/diet-plan/MongooseDietPlanRepository';

// @route GET /api/users/[id]/diets
// @desc Get all diet plans assigned to a patient
// @access Private
// TODO - Add authentication and authorization
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Repositories
    const dietPlanRepo = new MongooseDietPlanRepository();

    // Use case
    const useCase = new GetPatientDietPlansUseCase(dietPlanRepo);

    // Execute
    const dietPlans = await useCase.execute({
      patientId: id,
    });

    return NextResponse.json(
      {
        data: dietPlans,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching patient diet plans:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
