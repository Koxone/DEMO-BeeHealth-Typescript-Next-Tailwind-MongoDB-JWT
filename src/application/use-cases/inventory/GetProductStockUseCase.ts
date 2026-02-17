import { InventoryRepository } from '@/domain/repositories/inventory/InventoryRepository';
import { Inventory } from '@/domain/entities/inventory/Inventory';

export class GetProductStockUseCase {
  constructor(private inventoryRepository: InventoryRepository) {}

  async execute(productId: string): Promise<Inventory | null> {
    return await this.inventoryRepository.findByProductId(productId);
  }
}
