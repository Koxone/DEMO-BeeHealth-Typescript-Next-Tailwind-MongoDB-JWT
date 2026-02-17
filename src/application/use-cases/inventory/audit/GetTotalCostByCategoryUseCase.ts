import { ProductRepository } from '@/domain/repositories/inventory/ProductRepository';
import { InventoryCategoriesEnum } from '@/domain/enums/inventory/shared/InventoryCategoriesEnum';

export class GetTotalCostByCategoryUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(category: InventoryCategoriesEnum): Promise<number> {
    const products = await this.productRepository.findByCategory(category);

    return products.reduce((acc: number, product) => {
      const p = product.toPersistence();
      const cost = Number(p.costPrice) || 0;
      return acc + cost;
    }, 0);
  }
}
