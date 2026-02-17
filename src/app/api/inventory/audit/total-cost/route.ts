import { NextResponse } from 'next/server';
import { GetTotalCostByCategoryUseCase } from '@/application/use-cases/inventory/audit/GetTotalCostByCategoryUseCase';
import { MongooseProductRepository } from '@/infrastructure/repositories/inventory/MongooseProductRepository';
import { InventoryCategoriesEnum } from '@/domain/enums/inventory/shared/InventoryCategoriesEnum';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') as InventoryCategoriesEnum;

    if (!category) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    const productRepo = new MongooseProductRepository();
    const useCase = new GetTotalCostByCategoryUseCase(productRepo);
    const totalCost = await useCase.execute(category);

    return NextResponse.json({ category, totalCost }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
