import { ProductRepository } from '@/domain/repositories/inventory/ProductRepository';

export class GetTotalItemsCountUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<number> {
    return await this.productRepository.countAll();
  }
}
