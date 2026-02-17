import { DietTemplate } from '@/domain/entities/diet/DietTemplate';

export interface DietTemplateRepository {
  findById(id: string): Promise<DietTemplate | null>;

  findAll(): Promise<DietTemplate[]>;

  save(template: DietTemplate): Promise<void>;

  update(template: DietTemplate): Promise<void>;

  delete(id: string): Promise<void>;
}
