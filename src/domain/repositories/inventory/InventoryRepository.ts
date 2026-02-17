import { Inventory } from '@/domain/entities/inventory/Inventory';

export interface InventoryRepository {
  save(inventory: Inventory): Promise<void>;
  findByProductId(productId: string): Promise<Inventory | null>;
  findManyByProductIds(productIds: string[]): Promise<Inventory[]>;
}
