import { Product } from '@/domain/entities/inventory/Product';
import { UserSpecialty } from '@/domain/enums';
import { InventoryCategoriesEnum } from '@/domain/enums/inventory/shared/InventoryCategoriesEnum';
import { ProductRepository } from '@/domain/repositories/inventory/ProductRepository';
import { ProductModel } from '@/infrastructure/database/models/inventory/ProductModel';
import { ProductMapper } from '@/infrastructure/mappers/inventory/ProductMapper';

export class MongooseProductRepository implements ProductRepository {
  async save(product: Product): Promise<Product> {
    const persistence = ProductMapper.toPersistence(product);

    const savedDoc = await (ProductModel as any).findOneAndUpdate(
      { sku: persistence.sku },
      persistence,
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    return ProductMapper.toDomain(savedDoc);
  }

  async findById(id: string): Promise<Product | null> {
    const doc = await (ProductModel as any).findById(id).lean();
    return doc ? ProductMapper.toDomain(doc) : null;
  }

  async findBySku(sku: string): Promise<Product | null> {
    const doc = await (ProductModel as any).findOne({ sku }).lean();
    return doc ? ProductMapper.toDomain(doc) : null;
  }

  async findAllBySpecialty(specialty: UserSpecialty): Promise<Product[]> {
    const docs = await (ProductModel as any).find({ specialty }).lean();
    return docs.map((doc: any) => ProductMapper.toDomain(doc));
  }

  async findAll(): Promise<Product[]> {
    const docs = await (ProductModel as any).find().lean();
    return docs.map((doc: any) => ProductMapper.toDomain(doc));
  }

  async findBySpecialty(specialty: UserSpecialty): Promise<Product[]> {
    const docs = await (ProductModel as any).find({ specialty }).lean();
    return docs.map((doc: any) => ProductMapper.toDomain(doc));
  }

  async findByCategory(category: InventoryCategoriesEnum): Promise<Product[]> {
    const docs = await (ProductModel as any).find({ category }).lean();
    return docs.map((doc: any) => ProductMapper.toDomain(doc));
  }

  async countAll(): Promise<number> {
    return await (ProductModel as any).countDocuments();
  }
}
