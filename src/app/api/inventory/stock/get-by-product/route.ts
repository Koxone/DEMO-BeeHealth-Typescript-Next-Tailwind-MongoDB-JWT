import { NextResponse } from 'next/server';
import { GetProductStockUseCase } from '@/application/use-cases/inventory/GetProductStockUseCase';
import { MongooseInventoryRepository } from '@/infrastructure/repositories/inventory/MongooseInventoryRepository';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'ProductId is required' }, { status: 400 });
    }

    const inventoryRepo = new MongooseInventoryRepository();
    const useCase = new GetProductStockUseCase(inventoryRepo);

    const inventory = await useCase.execute(productId);

    if (!inventory) {
      return NextResponse.json({ error: 'Inventory record not found' }, { status: 404 });
    }

    return NextResponse.json(inventory.toPersistence(), { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}