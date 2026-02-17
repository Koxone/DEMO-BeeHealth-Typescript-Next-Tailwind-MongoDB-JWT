interface InventoryPropsDomain {
  id: string;
  productId: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  updatedAt: Date;
}

export class Inventory {
  private id: string;
  private productId: string;
  private currentStock: number;
  private minStock: number;
  private maxStock: number;
  private updatedAt: Date;

  private constructor(props: InventoryPropsDomain) {
    this.id = props.id;
    this.productId = props.productId;
    this.currentStock = props.currentStock;
    this.minStock = props.minStock;
    this.maxStock = props.maxStock;
    this.updatedAt = props.updatedAt;
  }

  static create(productId: string, minStock: number, maxStock: number): Inventory {
    return new Inventory({
      id: '',
      productId,
      currentStock: 0,
      minStock,
      maxStock,
      updatedAt: new Date(),
    });
  }

  static fromPersistence(props: InventoryPropsDomain): Inventory {
    return new Inventory(props);
  }

  updateStock(quantityDelta: number): void {
    this.currentStock += quantityDelta;
    this.updatedAt = new Date();
  }

  getCurrentStock(): number {
    return this.currentStock;
  }
  getProductId(): string {
    return this.productId;
  }
  getMinStock(): number {
    return this.minStock;
  }

  getMaxStock(): number {
    return this.maxStock;
  }

  toPersistence(): Omit<InventoryPropsDomain, 'id'> {
    return {
      productId: this.productId,
      currentStock: this.currentStock,
      minStock: this.minStock,
      maxStock: this.maxStock,
      updatedAt: this.updatedAt,
    };
  }
}
