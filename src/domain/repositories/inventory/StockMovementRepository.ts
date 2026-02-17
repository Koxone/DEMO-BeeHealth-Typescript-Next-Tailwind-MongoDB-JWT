import { StockMovement } from '@/domain/entities/inventory/StockMovement';

export interface StockMovementRepository {
  save(movement: StockMovement): Promise<void>;
  saveMany(movements: StockMovement[]): Promise<void>;
}
