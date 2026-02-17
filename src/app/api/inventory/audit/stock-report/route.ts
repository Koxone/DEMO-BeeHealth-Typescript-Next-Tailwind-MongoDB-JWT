import { NextResponse } from 'next/server';
import { GetStockStatusReportUseCase } from '@/application/use-cases/inventory/audit/GetStockStatusReportUseCase';
import { MongooseProductRepository } from '@/infrastructure/repositories/inventory/MongooseProductRepository';
import { MongooseInventoryRepository } from '@/infrastructure/repositories/inventory/MongooseInventoryRepository';

export async function GET() {
  try {
    const productRepo = new MongooseProductRepository();
    const inventoryRepo = new MongooseInventoryRepository();

    const useCase = new GetStockStatusReportUseCase(productRepo, inventoryRepo);
    const report = await useCase.execute();

    return NextResponse.json(report, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
