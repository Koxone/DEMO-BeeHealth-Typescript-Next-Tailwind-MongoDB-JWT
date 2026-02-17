import { StockMovement } from '@/domain/entities/inventory/StockMovement';
import { StockMovementRepository } from '@/domain/repositories/inventory/StockMovementRepository';
import { StockMovementModel } from '@/infrastructure/database/models/inventory/StockMovementModel';
import { StockMovementMapper } from '@/infrastructure/mappers/inventory/StockMovementMapper';

export class MongooseStockMovementRepository implements StockMovementRepository {
  async save(movement: StockMovement): Promise<void> {
    const persistence = StockMovementMapper.toPersistence(movement);
    await (StockMovementModel as any).create(persistence);
  }

  async saveMany(movements: StockMovement[]): Promise<void> {
    const persistenceList = movements.map((m) => StockMovementMapper.toPersistence(m));
    await (StockMovementModel as any).insertMany(persistenceList);
  }
}
