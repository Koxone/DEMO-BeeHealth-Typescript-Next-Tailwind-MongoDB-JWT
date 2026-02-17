import { NextResponse } from 'next/server';

// Use case
import { AssignDietToPatientUseCase } from '@/application/use-cases/diet-plan/AssignDietToPatientUseCase';

// Repositories
import { MongooseDietPlanRepository } from '@/infrastructure/repositories/diet-plan/MongooseDietPlanRepository';
import { MongoDietTemplateRepository } from '@/infrastructure/repositories/diet/MongoDietTemplateRepository';
import { MongoosePatientTimelineRepository } from '@/infrastructure/repositories/patient-timeline/MongoosePatientTimelineRepository';

// @route POST /api/users/[id]/diets/assign
// @desc Assign a diet to a patient
// @access Private
// TODO - Add authentication and authorization
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Repositories
    const dietPlanRepo = new MongooseDietPlanRepository();
    const dietTemplateRepo = new MongoDietTemplateRepository();
    const timelineRepo = new MongoosePatientTimelineRepository();

    // Use case
    const useCase = new AssignDietToPatientUseCase(dietPlanRepo, dietTemplateRepo, timelineRepo);

    // Execute
    const result = await useCase.execute({
      patientId: id,
      consultationId: body.consultationId,
      specialty: body.specialty,
      dietTemplateId: body.dietTemplateId,
      durationDays: body.durationDays,
    });

    return NextResponse.json(
      {
        message: 'Diet assigned successfully',
        data: result.getId(),
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error assigning diet:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
