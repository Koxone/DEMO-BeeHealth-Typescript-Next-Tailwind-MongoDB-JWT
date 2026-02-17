import { NextResponse } from 'next/server';
import { GetTotalItemsCountUseCase } from '@/application/use-cases/inventory/audit/GetTotalItemsCountUseCase';
import { MongooseProductRepository } from '@/infrastructure/repositories/inventory/MongooseProductRepository';

export async function GET() {
  try {
    const productRepo = new MongooseProductRepository();
    const useCase = new GetTotalItemsCountUseCase(productRepo);
    const totalItems = await useCase.execute();

    return NextResponse.json({ totalItems }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
