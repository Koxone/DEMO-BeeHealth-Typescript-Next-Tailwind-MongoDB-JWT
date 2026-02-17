import { UserSpecialty } from '@/domain/enums';
import { InventoryCategoriesEnum } from '@/domain/enums/inventory/shared/InventoryCategoriesEnum';
import { MoneyValueObject } from '@/domain/value-objects/inventory/MoneyValueObject';
import { SKUValueObject } from '@/domain/value-objects/inventory/SKUValueObject';

interface ProductPropsDomain {
  id: string;
  sku: string;
  specialty: UserSpecialty;
  name: string;
  description: string | null;
  category: InventoryCategoriesEnum;
  isPhysical: boolean;
  costPrice: MoneyValueObject;
  salePrice: MoneyValueObject;
  createdAt: Date;
  updatedAt: Date;
}

export class Product {
  private id: string;
  private sku: string;
  private specialty: UserSpecialty;
  private name: string;
  private description: string | null;
  private category: InventoryCategoriesEnum;
  private isPhysical: boolean;
  private costPrice: MoneyValueObject;
  private salePrice: MoneyValueObject;
  private readonly createdAt: Date;
  private updatedAt: Date;

  private constructor(props: ProductPropsDomain) {
    this.id = props.id;
    this.sku = props.sku;
    this.specialty = props.specialty;
    this.name = props.name;
    this.description = props.description;
    this.category = props.category;
    this.isPhysical = props.isPhysical;
    this.costPrice = props.costPrice;
    this.salePrice = props.salePrice;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: {
    name: string;
    category: InventoryCategoriesEnum;
    isPhysical: boolean;
    costPrice: MoneyValueObject;
    salePrice: MoneyValueObject;
    specialty: UserSpecialty;
    description?: string;
  }): Product {
    const now = new Date();
    const skuVO = SKUValueObject.create(props.specialty, props.category, props.name);

    return new Product({
      id: '', // Placeholder, should be set by Infraestructure layer when persisting
      sku: skuVO.getValue(),
      specialty: props.specialty,
      name: props.name,
      description: props.description ?? null,
      category: props.category,
      isPhysical: props.isPhysical,
      costPrice: props.costPrice,
      salePrice: props.salePrice,
      createdAt: now,
      updatedAt: now,
    });
  }

  static fromPersistence(props: ProductPropsDomain): Product {
    return new Product(props);
  }

  updatePrices(cost: MoneyValueObject, sale: MoneyValueObject): void {
    this.costPrice = cost;
    this.salePrice = sale;
    this.updatedAt = new Date();
  }

  getId(): string {
    return this.id;
  }
  getSku(): string {
    return this.sku;
  }
  getName(): string {
    return this.name;
  }
  getCategory(): InventoryCategoriesEnum {
    return this.category;
  }
  getCostPrice(): MoneyValueObject {
    return this.costPrice;
  }
  getSalePrice(): MoneyValueObject {
    return this.salePrice;
  }
  getSpecialty(): UserSpecialty {
    return this.specialty;
  }

  toPersistence(): Omit<ProductPropsDomain, 'id'> {
    return {
      sku: this.sku,
      name: this.name,
      description: this.description,
      category: this.category,
      isPhysical: this.isPhysical,
      costPrice: this.costPrice,
      salePrice: this.salePrice,
      specialty: this.specialty,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
