import { Sale } from '@/domain/entities/inventory/Sale';
import { MoneyValueObject } from '@/domain/value-objects/inventory/MoneyValueObject';

export class SaleMapper {
  static toDomain(raw: any): Sale {
    return Sale.fromPersistence({
      id: raw._id.toString(),
      consultationId: raw.consultationId ? raw.consultationId.toString() : null,
      patientId: raw.patientId ? raw.patientId.toString() : null,
      items: raw.items.map((item: any) => ({
        productId: item.productId.toString(),
        quantity: item.quantity,
        unitPrice: new MoneyValueObject(item.unitPrice.amount, item.unitPrice.currency),
        subtotal: new MoneyValueObject(item.subtotal.amount, item.subtotal.currency),
      })),
      total: new MoneyValueObject(raw.total.amount, raw.total.currency),
      paymentMethod: raw.paymentMethod,
      status: raw.status,
      createdAt: raw.createdAt,
    });
  }

  static toPersistence(sale: Sale) {
    const persistence = sale.toPersistence();
    return {
      consultationId: persistence.consultationId,
      patientId: persistence.patientId,
      items: persistence.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: {
          amount: item.unitPrice.getAmount(),
          currency: item.unitPrice.getCurrency(),
        },
        subtotal: {
          amount: item.subtotal.getAmount(),
          currency: item.subtotal.getCurrency(),
        },
      })),
      total: {
        amount: persistence.total.getAmount(),
        currency: persistence.total.getCurrency(),
      },
      paymentMethod: persistence.paymentMethod,
      status: persistence.status,
      createdAt: persistence.createdAt,
    };
  }
}
