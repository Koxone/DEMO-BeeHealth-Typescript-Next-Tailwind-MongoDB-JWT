import { ProductRepository } from '@/domain/repositories/inventory/ProductRepository';
import { InventoryRepository } from '@/domain/repositories/inventory/InventoryRepository';
import { StockStatusEnum } from '@/domain/enums/inventory/audit/StockStatusEnum';
import { StockStatusItem, StockStatusReport } from '@/presentation/types';

export class GetStockStatusReportUseCase {
  constructor(
    private productRepository: ProductRepository,
    private inventoryRepository: InventoryRepository
  ) {}

  async execute(): Promise<StockStatusReport> {
    const products = await this.productRepository.findAll();
    const productIds = products.map((p) => p.getId());
    const inventories = await this.inventoryRepository.findManyByProductIds(productIds);

    const report: StockStatusReport = {
      critical: [],
      low: [],
      overstocked: [],
      normal: [],
    };

    products.forEach((product) => {
      const productId = product.getId();
      const inventory = inventories.find((i) => i.getProductId() === productId);

      if (!inventory) return;

      const current = inventory.getCurrentStock();
      const min = inventory.getMinStock();
      const max = inventory.getMaxStock();

      const item: StockStatusItem = {
        id: productId,
        name: product.getName(),
        sku: product.getSku(),
        currentStock: current,
        minStock: min,
        maxStock: max,
        status: StockStatusEnum.NORMAL,
      };

      if (current <= min * 0.3) {
        item.status = StockStatusEnum.CRITICAL;
        report.critical.push(item);
      } else if (current <= min) {
        item.status = StockStatusEnum.LOW;
        report.low.push(item);
      } else if (max > 0 && current > max) {
        item.status = StockStatusEnum.OVERSTOCKED;
        report.overstocked.push(item);
      } else {
        report.normal.push(item);
      }
    });

    return report;
  }
}
