import { Inventory } from '@/domain/entities/inventory/Inventory';

export class InventoryMapper {
  static toDomain(raw: any): Inventory {
    return Inventory.fromPersistence({
      id: raw._id.toString(),
      productId: raw.productId.toString(),
      currentStock: raw.currentStock,
      minStock: raw.minStock,
      maxStock: raw.maxStock,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(inventory: Inventory) {
    const persistence = inventory.toPersistence();
    return {
      productId: persistence.productId,
      currentStock: persistence.currentStock,
      minStock: persistence.minStock,
      maxStock: persistence.maxStock,
      updatedAt: persistence.updatedAt,
    };
  }
}
