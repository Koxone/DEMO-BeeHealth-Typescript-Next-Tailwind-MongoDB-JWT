import { Inventory } from '@/domain/entities/inventory/Inventory';
import { InventoryRepository } from '@/domain/repositories/inventory/InventoryRepository';
import { InventoryModel } from '@/infrastructure/database/models/inventory/InventoryModel';
import { InventoryMapper } from '@/infrastructure/mappers/inventory/InventoryMapper';

export class MongooseInventoryRepository implements InventoryRepository {
  async save(inventory: Inventory): Promise<void> {
    const persistence = InventoryMapper.toPersistence(inventory);
    await (InventoryModel as any).findOneAndUpdate(
      { productId: persistence.productId },
      persistence,
      { upsert: true }
    );
  }

  async findByProductId(productId: string): Promise<Inventory | null> {
    const doc = await (InventoryModel as any).findOne({ productId }).lean();
    return doc ? InventoryMapper.toDomain(doc) : null;
  }

  async findManyByProductIds(productIds: string[]): Promise<Inventory[]> {
    const docs = await (InventoryModel as any)
      .find({
        productId: { $in: productIds },
      })
      .lean();
    return docs.map((doc: any) => InventoryMapper.toDomain(doc));
  }
}
