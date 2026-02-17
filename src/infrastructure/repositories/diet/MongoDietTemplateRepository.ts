// Domain
import { DietTemplate } from '@/domain/entities/diet/DietTemplate';
import { DietTemplateRepository } from '@/domain/repositories/diet/DietTemplateRepository';

// Database
import DietModel from '@/infrastructure/database/models/diet/DietModel';

// Mappers
import { DietTemplateMapper } from '../../services/diet/DietTemplateMapper';

export class MongoDietTemplateRepository implements DietTemplateRepository {
  public async findById(id: string): Promise<DietTemplate | null> {
    const raw = await DietModel.findById(id).lean();
    if (!raw) return null;
    return DietTemplateMapper.toDomain(raw);
  }

  public async findAll(): Promise<DietTemplate[]> {
    const raws = await DietModel.find().lean();
    return raws.map((raw) => DietTemplateMapper.toDomain(raw));
  }

  public async save(template: DietTemplate): Promise<void> {
    const persistenceModel = DietTemplateMapper.toPersistence(template);
    await DietModel.create(persistenceModel);
  }

  public async update(template: DietTemplate): Promise<void> {
    const persistenceModel = DietTemplateMapper.toPersistence(template);
    const { _id, ...updateData } = persistenceModel;
    await DietModel.findByIdAndUpdate(template.id, updateData);
  }

  public async delete(id: string): Promise<void> {
    await DietModel.findByIdAndDelete(id);
  }
}
