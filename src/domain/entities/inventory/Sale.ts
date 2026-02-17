import { PaymentMethodsEnum } from '@/domain/enums/inventory/sale/PaymentMethodsEnum';
import { SaleStatusEnum } from '@/domain/enums/inventory/sale/SaleStatusEnum';
import { MoneyValueObject } from '@/domain/value-objects/inventory/MoneyValueObject';

interface SaleItem {
  productId: string;
  quantity: number;
  unitPrice: MoneyValueObject;
  subtotal: MoneyValueObject;
}

interface SalePropsDomain {
  id: string;
  consultationId: string | null;
  patientId: string | null;
  items: SaleItem[];
  total: MoneyValueObject;
  paymentMethod: PaymentMethodsEnum;
  status: SaleStatusEnum;
  createdAt: Date;
}

export class Sale {
  private id: string;
  private consultationId: string | null;
  private patientId: string | null;
  private items: SaleItem[];
  private total: MoneyValueObject;
  private paymentMethod: PaymentMethodsEnum;
  private status: SaleStatusEnum;
  private readonly createdAt: Date;

  private constructor(props: SalePropsDomain) {
    this.id = props.id;
    this.consultationId = props.consultationId;
    this.patientId = props.patientId;
    this.items = props.items;
    this.total = props.total;
    this.paymentMethod = props.paymentMethod;
    this.status = props.status;
    this.createdAt = props.createdAt;
  }

  // Factory method to create a new Sale, calculating total from items
  static create(props: {
    items: SaleItem[];
    paymentMethod: PaymentMethodsEnum;
    consultationId?: string | null;
    patientId?: string | null;
  }): Sale {
    if (props.items.length === 0) throw new Error('Sale must have at least one item');

    const totalAmount = props.items.reduce((acc, item) => acc + item.subtotal.getAmount(), 0);
    const total = new MoneyValueObject(totalAmount);

    return new Sale({
      id: '',
      consultationId: props.consultationId ?? null,
      patientId: props.patientId ?? null,
      items: props.items,
      total,
      paymentMethod: props.paymentMethod,
      status: SaleStatusEnum.COMPLETED,
      createdAt: new Date(),
    });
  }

  static fromPersistence(props: SalePropsDomain): Sale {
    return new Sale(props);
  }

  cancel(): void {
    this.status = SaleStatusEnum.CANCELLED;
  }

  getId(): string {
    return this.id;
  }
  getItems(): SaleItem[] {
    return this.items;
  }
  getTotal(): MoneyValueObject {
    return this.total;
  }
  getStatus(): SaleStatusEnum {
    return this.status;
  }

  toPersistence(): Omit<SalePropsDomain, 'id'> {
    return {
      consultationId: this.consultationId,
      patientId: this.patientId,
      items: this.items,
      total: this.total,
      paymentMethod: this.paymentMethod,
      status: this.status,
      createdAt: this.createdAt,
    };
  }
}
