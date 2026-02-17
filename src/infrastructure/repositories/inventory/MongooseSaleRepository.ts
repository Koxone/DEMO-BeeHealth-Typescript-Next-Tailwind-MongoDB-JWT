import { Sale } from '@/domain/entities/inventory/Sale';
import { SaleRepository } from '@/domain/repositories/inventory/SaleRepository';
import { SaleModel } from '@/infrastructure/database/models/inventory/SaleModel';
import { SaleMapper } from '@/infrastructure/mappers/inventory/SaleMapper';

export class MongooseSaleRepository implements SaleRepository {
  async save(sale: Sale): Promise<string> {
    const persistence = SaleMapper.toPersistence(sale);
    const savedDoc = await (SaleModel as any).create(persistence);
    return savedDoc._id.toString();
  }

  async findById(id: string): Promise<Sale | null> {
    const doc = await (SaleModel as any).findById(id).lean();
    return doc ? SaleMapper.toDomain(doc) : null;
  }
}
