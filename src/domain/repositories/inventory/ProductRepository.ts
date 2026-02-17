import { Product } from '@/domain/entities/inventory/Product';
import { InventoryCategoriesEnum } from '@/domain/enums/inventory/shared/InventoryCategoriesEnum';
import { UserSpecialty } from '@/domain/enums/UserSpecialty';

export interface ProductRepository {
  save(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findBySku(sku: string): Promise<Product | null>;
  findAllBySpecialty(specialty: UserSpecialty): Promise<Product[]>;
  findAll(): Promise<Product[]>;
  findBySpecialty(specialty: UserSpecialty): Promise<Product[]>;
  findByCategory(category: InventoryCategoriesEnum): Promise<Product[]>;
  countAll(): Promise<number>;
}
