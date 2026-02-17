import { NextResponse } from 'next/server';
import { ProcessSaleUseCase } from '@/application/use-cases/inventory/ProcessSaleUseCase';
import { MongooseSaleRepository } from '@/infrastructure/repositories/inventory/MongooseSaleRepository';
import { MongooseInventoryRepository } from '@/infrastructure/repositories/inventory/MongooseInventoryRepository';
import { MongooseStockMovementRepository } from '@/infrastructure/repositories/inventory/MongooseStockMovementRepository';
import { AuthTokenExtractor } from '@/infrastructure/services/auth/AuthTokenExtractor';
import { JwtTokenService } from '@/infrastructure/services/auth/JwtTokenService';
import { AuthRequiredError } from '@/domain/errors/AuthRequiredError';

export async function POST(req: Request) {
  try {
    const extractor = new AuthTokenExtractor();
    const tokenService = new JwtTokenService();

    const token = extractor.extract(req);
    if (!token) {
      throw new AuthRequiredError();
    }

    const { id: performedBy } = tokenService.verify(token);
    const body = await req.json();

    const saleRepo = new MongooseSaleRepository();
    const inventoryRepo = new MongooseInventoryRepository();
    const movementRepo = new MongooseStockMovementRepository();

    const useCase = new ProcessSaleUseCase(saleRepo, inventoryRepo, movementRepo);

    const sale = await useCase.execute({
      items: body.items,
      paymentMethod: body.paymentMethod,
      performedBy: performedBy,
      patientId: body.patientId,
      consultationId: body.consultationId,
    });

    return NextResponse.json(sale.toPersistence(), { status: 201 });
  } catch (error: any) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'AUTH_REQUIRED' }, { status: 401 });
    }
    return NextResponse.json({ error: error.message || 'INTERNAL_ERROR' }, { status: 400 });
  }
}
