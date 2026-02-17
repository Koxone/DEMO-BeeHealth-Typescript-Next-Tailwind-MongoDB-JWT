import { UserSpecialty } from '@/domain/enums';
import { InventoryCategoriesEnum } from '@/domain/enums/inventory/shared/InventoryCategoriesEnum';

export class SKUValueObject {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(
    specialty: UserSpecialty,
    category: InventoryCategoriesEnum,
    productName: string
  ): SKUValueObject {
    if (!productName || productName.trim().length < 2) {
      throw new Error('Product name too short to generate SKU');
    }

    const namePart = productName.trim().replace(/\s+/g, '').substring(0, 4).toUpperCase();

    // Format: WGT-MEDS-METF
    const generatedSku = `${specialty.toUpperCase()}-${category.toUpperCase()}-${namePart}`;

    return new SKUValueObject(generatedSku);
  }

  static fromPersistence(value: string): SKUValueObject {
    if (!value || value.trim().length === 0) {
      throw new Error('Invalid SKU value');
    }
    return new SKUValueObject(value.toUpperCase());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: SKUValueObject): boolean {
    return this.value === other.getValue();
  }
}
