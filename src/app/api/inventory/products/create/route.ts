import { NextResponse } from 'next/server';
import { CreateProductUseCase } from '@/application/use-cases/inventory/CreateProductUseCase';
import { MongooseProductRepository } from '@/infrastructure/repositories/inventory/MongooseProductRepository';
import { MongooseInventoryRepository } from '@/infrastructure/repositories/inventory/MongooseInventoryRepository';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const productRepo = new MongooseProductRepository();
    const inventoryRepo = new MongooseInventoryRepository();

    const useCase = new CreateProductUseCase(productRepo, inventoryRepo);

    const product = await useCase.execute({
      name: body.name,
      category: body.category,
      isPhysical: body.isPhysical,
      costPrice: body.costPrice,
      salePrice: body.salePrice,
      specialty: body.specialty,
      description: body.description,
      minStock: body.minStock,
      maxStock: body.maxStock,
    });

    return NextResponse.json(product.toPersistence(), { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
