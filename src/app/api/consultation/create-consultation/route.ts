import { NextRequest, NextResponse } from 'next/server';
import { CreateWeightConsultationUseCase } from '@/application/use-cases/consultation/CreateWeightConsultation';
import { MongooseConsultationRepository } from '@/infrastructure/repositories/consultation/MongooseConsultationRepository';

// @route POST /api/consultation/create-consultation
// @desc Create a new weight consultation for a patient
// @access Public
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validación básica
    if (!body.patientId) {
      return NextResponse.json({ error: 'patientId es requerido' }, { status: 400 });
    }

    if (!body.answers || !Array.isArray(body.answers) || body.answers.length === 0) {
      return NextResponse.json(
        { error: 'answers es requerido y debe ser un array' },
        { status: 400 }
      );
    }

    // Instanciar dependencias
    const repository = new MongooseConsultationRepository();
    const useCase = new CreateWeightConsultationUseCase(repository);

    // Ejecutar
    const result = await useCase.execute({
      patientId: body.patientId,
      answers: body.answers,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating weight consultation:', error);

    if (error instanceof Error) {
      if (error.message.includes('Ya existe')) {
        return NextResponse.json({ error: error.message }, { status: 409 });
      }

      if (error.message.includes('obligatorias')) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }

    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
