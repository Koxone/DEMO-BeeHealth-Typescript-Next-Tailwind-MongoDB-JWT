import { Sale } from '@/domain/entities/inventory/Sale';
import { StockMovement } from '@/domain/entities/inventory/StockMovement';
import { SaleRepository } from '@/domain/repositories/inventory/SaleRepository';
import { InventoryRepository } from '@/domain/repositories/inventory/InventoryRepository';
import { StockMovementRepository } from '@/domain/repositories/inventory/StockMovementRepository';
import { SaleInventoryService } from '@/domain/services/inventory/SaleInventoryService';
import { PaymentMethodsEnum } from '@/domain/enums/inventory/sale/PaymentMethodsEnum';
import { MoneyValueObject } from '@/domain/value-objects/inventory/MoneyValueObject';

export class ProcessSaleUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private inventoryRepository: InventoryRepository,
    private stockMovementRepository: StockMovementRepository
  ) {}

  async execute(data: {
    items: { productId: string; quantity: number; price: number }[];
    paymentMethod: PaymentMethodsEnum;
    performedBy: string;
    patientId?: string;
    consultationId?: string;
  }): Promise<Sale> {
    const saleItems = data.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: new MoneyValueObject(item.price),
      subtotal: new MoneyValueObject(item.price * item.quantity),
    }));

    const saleEntity = Sale.create({
      items: saleItems,
      paymentMethod: data.paymentMethod,
      patientId: data.patientId,
      consultationId: data.consultationId,
    });

    const productIds = saleEntity.getItems().map((i) => i.productId);
    const inventories = await this.inventoryRepository.findManyByProductIds(productIds);

    const { updatedInventories, movements } = SaleInventoryService.processSaleStock({
      sale: saleEntity,
      inventories,
      performedBy: data.performedBy,
    });

    const savedSaleId = await this.saleRepository.save(saleEntity);

    const saleWithId = Sale.fromPersistence({
      ...saleEntity.toPersistence(),
      id: savedSaleId,
    });

    for (const inv of updatedInventories) {
      await this.inventoryRepository.save(inv);
    }

    const finalMovements = movements.map((m) => {
      const p = m.toPersistence();
      return StockMovement.fromPersistence({
        ...p,
        id: '',
        sourceId: savedSaleId,
      });
    });

    await this.stockMovementRepository.saveMany(finalMovements);

    return saleWithId;
  }
}
