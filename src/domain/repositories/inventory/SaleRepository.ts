import { Sale } from '@/domain/entities/inventory/Sale';

export interface SaleRepository {
  save(sale: Sale): Promise<string>;
  findById(id: string): Promise<Sale | null>;
}
