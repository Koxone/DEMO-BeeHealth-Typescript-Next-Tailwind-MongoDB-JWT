import { Product } from '@/domain/entities/inventory/Product';
import { ProductRepository } from '@/domain/repositories/inventory/ProductRepository';
import { UserSpecialty } from '@/domain/enums';

export class GetProductsBySpecialtyUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(specialty: UserSpecialty): Promise<Product[]> {
    return await this.productRepository.findBySpecialty(specialty);
  }
}
