import { Product } from '@/domain/entities/inventory/Product';
import { Inventory } from '@/domain/entities/inventory/Inventory';
import { ProductRepository } from '@/domain/repositories/inventory/ProductRepository';
import { InventoryRepository } from '@/domain/repositories/inventory/InventoryRepository';
import { InventoryCategoriesEnum } from '@/domain/enums/inventory/shared/InventoryCategoriesEnum';
import { UserSpecialty } from '@/domain/enums';
import { MoneyValueObject } from '@/domain/value-objects/inventory/MoneyValueObject';

export class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private inventoryRepository: InventoryRepository
  ) {}

  async execute(data: {
    name: string;
    category: InventoryCategoriesEnum;
    isPhysical: boolean;
    costPrice: number;
    salePrice: number;
    specialty: UserSpecialty;
    description?: string;
    minStock?: number;
    maxStock?: number;
  }): Promise<Product> {
    const product = Product.create({
      name: data.name,
      category: data.category,
      isPhysical: data.isPhysical,
      costPrice: new MoneyValueObject(data.costPrice),
      salePrice: new MoneyValueObject(data.salePrice),
      specialty: data.specialty,
      description: data.description,
    });

    const savedProduct = await this.productRepository.save(product);

    if (data.isPhysical) {
      const inventory = Inventory.create(
        savedProduct.getId(),
        data.minStock ?? 0,
        data.maxStock ?? 0
      );
      await this.inventoryRepository.save(inventory);
    }

    return savedProduct;
  }
}
