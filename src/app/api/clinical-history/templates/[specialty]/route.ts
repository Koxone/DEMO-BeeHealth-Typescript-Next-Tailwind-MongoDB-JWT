import { NextResponse } from 'next/server';
import { MongooseFormTemplateRepository } from '@/infrastructure/repositories/clinical-history/MongooseFormTemplateRepository';
import { UserSpecialty } from '@/domain/enums/';

// @route    GET /api/clinical-history/templates/:specialty
// @desc     Get clinical history template by specialty
// @access   Public
// todo Make this endpoint protected, only for authenticated users
export async function GET(request: Request, { params }: { params: { specialty: UserSpecialty } }) {
  try {
    const { specialty } = await params;
    const repository = new MongooseFormTemplateRepository();

    const template = await repository.getTemplateBySpecialty(specialty);

    if (!template) {
      return NextResponse.json(
        { error: `No se encontró template para: ${specialty}` },
        { status: 404 }
      );
    }

    return NextResponse.json(template);
  } catch (error) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// Usage example: /api/clinical-history/templates/weight
// Response: { template data for weight specialty }
// try {
//   const response = await fetch('/api/clinical-history/templates/weight');
//   const data = await response.json();
//   console.log(data);
// } catch (error) {
// }
