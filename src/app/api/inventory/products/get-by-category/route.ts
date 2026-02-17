import { NextResponse } from 'next/server';
import { GetProductsByCategoryUseCase } from '@/application/use-cases/inventory/GetProductsByCategoryUseCase';
import { MongooseProductRepository } from '@/infrastructure/repositories/inventory/MongooseProductRepository';
import { InventoryCategoriesEnum } from '@/domain/enums/inventory/shared/InventoryCategoriesEnum';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') as InventoryCategoriesEnum;

    if (!category) throw new Error('Category is required');

    const productRepo = new MongooseProductRepository();
    const useCase = new GetProductsByCategoryUseCase(productRepo);
    const products = await useCase.execute(category);

    return NextResponse.json(
      products.map((p) => p.toPersistence()),
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
