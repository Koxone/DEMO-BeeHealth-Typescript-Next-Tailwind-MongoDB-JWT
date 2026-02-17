import { NextResponse } from 'next/server';
import { UpdateStockAdjustmentUseCase } from '@/application/use-cases/inventory/UpdateStockAdjustmentUseCase';
import { MongooseInventoryRepository } from '@/infrastructure/repositories/inventory/MongooseInventoryRepository';
import { MongooseStockMovementRepository } from '@/infrastructure/repositories/inventory/MongooseStockMovementRepository';
import { AuthTokenExtractor } from '@/infrastructure/services/auth/AuthTokenExtractor';
import { JwtTokenService } from '@/infrastructure/services/auth/JwtTokenService';
import { AuthRequiredError } from '@/domain/errors/AuthRequiredError';

export async function PATCH(req: Request) {
  try {
    const extractor = new AuthTokenExtractor();
    const tokenService = new JwtTokenService();

    const token = extractor.extract(req);
    if (!token) {
      throw new AuthRequiredError();
    }

    const { id: performedBy } = tokenService.verify(token);
    const body = await req.json();

    const inventoryRepo = new MongooseInventoryRepository();
    const movementRepo = new MongooseStockMovementRepository();

    const useCase = new UpdateStockAdjustmentUseCase(inventoryRepo, movementRepo);

    await useCase.execute({
      productId: body.productId,
      quantityDelta: body.quantityDelta,
      reason: body.reason,
      performedBy: performedBy,
    });

    return NextResponse.json({ message: 'Stock adjusted successfully' }, { status: 200 });
  } catch (error: any) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'AUTH_REQUIRED' }, { status: 401 });
    }
    return NextResponse.json({ error: error.message || 'INTERNAL_ERROR' }, { status: 400 });
  }
}
