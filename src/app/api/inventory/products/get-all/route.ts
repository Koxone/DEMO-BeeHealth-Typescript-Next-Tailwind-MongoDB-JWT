import { NextResponse } from 'next/server';
import { GetAllProductsUseCase } from '@/application/use-cases/inventory/GetAllProductsUseCase';
import { MongooseProductRepository } from '@/infrastructure/repositories/inventory/MongooseProductRepository';

export async function GET() {
  try {
    const productRepo = new MongooseProductRepository();
    const useCase = new GetAllProductsUseCase(productRepo);
    const products = await useCase.execute();

    return NextResponse.json(
      products.map((p) => p.toPersistence()),
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
