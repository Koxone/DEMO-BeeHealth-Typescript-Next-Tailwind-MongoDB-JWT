import { Product } from '@/domain/entities/inventory/Product';
import { ProductRepository } from '@/domain/repositories/inventory/ProductRepository';
import { InventoryCategoriesEnum } from '@/domain/enums/inventory/shared/InventoryCategoriesEnum';

export class GetProductsByCategoryUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(category: InventoryCategoriesEnum): Promise<Product[]> {
    return await this.productRepository.findByCategory(category);
  }
}
