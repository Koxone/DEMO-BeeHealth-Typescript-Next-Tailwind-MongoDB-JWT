import { InventoryRepository } from '@/domain/repositories/inventory/InventoryRepository';
import { StockMovementRepository } from '@/domain/repositories/inventory/StockMovementRepository';
import { StockMovement } from '@/domain/entities/inventory/StockMovement';
import { MovementTypeEnum } from '@/domain/enums/inventory/stock-movement/MovementTypeEnum';
import { SourceTypeEnum } from '@/domain/enums/inventory/stock-movement/SourceTypeEnum';

export class UpdateStockAdjustmentUseCase {
  constructor(
    private inventoryRepository: InventoryRepository,
    private stockMovementRepository: StockMovementRepository
  ) {}

  async execute(data: {
    productId: string;
    quantityDelta: number;
    reason: string;
    performedBy: string;
  }): Promise<void> {
    const inventory = await this.inventoryRepository.findByProductId(data.productId);
    if (!inventory) throw new Error('Inventory not found');

    const balanceBefore = inventory.getCurrentStock();
    inventory.updateStock(data.quantityDelta);

    const movement = StockMovement.create({
      productId: data.productId,
      type: data.quantityDelta > 0 ? MovementTypeEnum.IN : MovementTypeEnum.OUT,
      source: SourceTypeEnum.CORRECTION,
      balanceBefore: balanceBefore,
      quantity: Math.abs(data.quantityDelta),
      balanceAfter: inventory.getCurrentStock(),
      performedBy: data.performedBy,
      sourceId: null, // Manual adjustment has no source document
    });

    await this.inventoryRepository.save(inventory);
    await this.stockMovementRepository.save(movement);
  }
}
