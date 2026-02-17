import { Product } from '@/domain/entities/inventory/Product';
import { MoneyValueObject } from '@/domain/value-objects/inventory/MoneyValueObject';

export class ProductMapper {
  static toDomain(raw: any): Product {
    return Product.fromPersistence({
      id: raw._id.toString(),
      sku: raw.sku,
      specialty: raw.specialty,
      name: raw.name,
      description: raw.description,
      category: raw.category,
      isPhysical: raw.isPhysical,
      costPrice: new MoneyValueObject(raw.costPrice.amount, raw.costPrice.currency),
      salePrice: new MoneyValueObject(raw.salePrice.amount, raw.salePrice.currency),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(product: Product) {
    const persistence = product.toPersistence();
    return {
      sku: persistence.sku,
      specialty: persistence.specialty,
      name: persistence.name,
      description: persistence.description,
      category: persistence.category,
      isPhysical: persistence.isPhysical,
      costPrice: {
        amount: persistence.costPrice.getAmount(),
        currency: persistence.costPrice.getCurrency(),
      },
      salePrice: {
        amount: persistence.salePrice.getAmount(),
        currency: persistence.salePrice.getCurrency(),
      },
      createdAt: persistence.createdAt,
      updatedAt: persistence.updatedAt,
    };
  }
}
