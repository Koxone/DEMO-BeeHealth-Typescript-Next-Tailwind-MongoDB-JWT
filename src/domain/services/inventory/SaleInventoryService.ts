import { Sale } from '@/domain/entities/inventory/Sale';
import { Inventory } from '@/domain/entities/inventory/Inventory';
import { StockMovement } from '@/domain/entities/inventory/StockMovement';
import { MovementTypeEnum } from '@/domain/enums/inventory/stock-movement/MovementTypeEnum';
import { SourceTypeEnum } from '@/domain/enums/inventory/stock-movement/SourceTypeEnum';

export class SaleInventoryService {
  /**
   * Orchestrates the impact of a Sale on the Inventory and generates traceability.
   * This logic should be used within a transaction in the application layer.
   */
  static processSaleStock(params: { sale: Sale; inventories: Inventory[]; performedBy: string }): {
    updatedInventories: Inventory[];
    movements: StockMovement[];
  } {
    const { sale, inventories, performedBy } = params;
    const updatedInventories: Inventory[] = [];
    const movements: StockMovement[] = [];

    for (const item of sale.getItems()) {
      const inventory = inventories.find((inv) => inv.getProductId() === item.productId);

      if (!inventory) {
        throw new Error(`Inventory record not found for product: ${item.productId}`);
      }

      const balanceBefore = inventory.getCurrentStock();

      if (balanceBefore < item.quantity) {
        throw new Error(
          `Insufficient stock for product: ${item.productId}. Available: ${balanceBefore}, Requested: ${item.quantity}`
        );
      }

      // Update Domain Entity state
      inventory.updateStock(-item.quantity);
      updatedInventories.push(inventory);

      // Create traceability record
      const movement = StockMovement.create({
        productId: item.productId,
        type: MovementTypeEnum.OUT,
        source: SourceTypeEnum.SALE,
        sourceId: sale.getId(),
        balanceBefore: balanceBefore,
        quantity: item.quantity,
        balanceAfter: inventory.getCurrentStock(),
        performedBy: performedBy,
      });

      movements.push(movement);
    }

    return { updatedInventories, movements };
  }
}
