import { MovementTypeEnum } from '@/domain/enums/inventory/stock-movement/MovementTypeEnum';
import { SourceTypeEnum } from '@/domain/enums/inventory/stock-movement/SourceTypeEnum';

interface StockMovementPropsDomain {
  id: string;
  productId: string;
  type: MovementTypeEnum;
  source: SourceTypeEnum;
  sourceId: string | null;
  balanceBefore: number;
  quantity: number;
  balanceAfter: number;
  performedBy: string;
  createdAt: Date;
}

export class StockMovement {
  private id: string;
  private productId: string;
  private type: MovementTypeEnum;
  private source: SourceTypeEnum;
  private sourceId: string | null;
  private balanceBefore: number;
  private quantity: number;
  private balanceAfter: number;
  private performedBy: string;
  private readonly createdAt: Date;

  private constructor(props: StockMovementPropsDomain) {
    this.id = props.id;
    this.productId = props.productId;
    this.type = props.type;
    this.source = props.source;
    this.sourceId = props.sourceId;
    this.balanceBefore = props.balanceBefore;
    this.quantity = props.quantity;
    this.balanceAfter = props.balanceAfter;
    this.performedBy = props.performedBy;
    this.createdAt = props.createdAt;
  }

  static create(props: {
    productId: string;
    type: MovementTypeEnum;
    source: SourceTypeEnum;
    balanceBefore: number;
    quantity: number;
    balanceAfter: number;
    performedBy: string;
    sourceId?: string | null;
  }): StockMovement {
    return new StockMovement({
      id: '',
      productId: props.productId,
      type: props.type,
      source: props.source,
      sourceId: props.sourceId ?? null,
      balanceBefore: props.balanceBefore,
      quantity: props.quantity,
      balanceAfter: props.balanceAfter,
      performedBy: props.performedBy,
      createdAt: new Date(),
    });
  }

  static fromPersistence(props: StockMovementPropsDomain): StockMovement {
    return new StockMovement(props);
  }

  toPersistence(): Omit<StockMovementPropsDomain, 'id'> {
    return {
      productId: this.productId,
      type: this.type,
      source: this.source,
      sourceId: this.sourceId,
      balanceBefore: this.balanceBefore,
      quantity: this.quantity,
      balanceAfter: this.balanceAfter,
      performedBy: this.performedBy,
      createdAt: this.createdAt,
    };
  }
}
