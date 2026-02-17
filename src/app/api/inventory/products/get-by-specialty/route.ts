import { NextResponse } from 'next/server';
import { GetProductsBySpecialtyUseCase } from '@/application/use-cases/inventory/GetProductsBySpecialtyUseCase';
import { MongooseProductRepository } from '@/infrastructure/repositories/inventory/MongooseProductRepository';
import { UserSpecialty } from '@/domain/enums';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const specialty = searchParams.get('specialty') as UserSpecialty;

    if (!specialty) throw new Error('Specialty is required');

    const productRepo = new MongooseProductRepository();
    const useCase = new GetProductsBySpecialtyUseCase(productRepo);
    const products = await useCase.execute(specialty);

    return NextResponse.json(
      products.map((p) => p.toPersistence()),
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
