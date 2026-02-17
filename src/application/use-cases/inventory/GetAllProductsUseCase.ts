import { Product } from '@/domain/entities/inventory/Product';
import { ProductRepository } from '@/domain/repositories/inventory/ProductRepository';

export class GetAllProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }
}
