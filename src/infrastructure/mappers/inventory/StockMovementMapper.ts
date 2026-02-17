import { StockMovement } from '@/domain/entities/inventory/StockMovement';

export class StockMovementMapper {
  static toDomain(raw: any): StockMovement {
    return StockMovement.fromPersistence({
      id: raw._id.toString(),
      productId: raw.productId.toString(),
      type: raw.type,
      source: raw.source,
      sourceId: raw.sourceId ? raw.sourceId.toString() : null,
      balanceBefore: raw.balanceBefore,
      quantity: raw.quantity,
      balanceAfter: raw.balanceAfter,
      performedBy: raw.performedBy.toString(),
      createdAt: raw.createdAt,
    });
  }

  static toPersistence(movement: StockMovement) {
    return movement.toPersistence();
  }
}
