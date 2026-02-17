import { DietTemplate } from '@/domain/entities/diet/DietTemplate';
import { DietContent } from '@/domain/value-objects/diet/DietContent';
import { DietRestriction } from '@/domain/value-objects/diet/DietRestriction';
import { DietTemplateRepository } from '@/domain/repositories/diet/DietTemplateRepository';

export interface CreateDietTemplateRequest {
  name: string;
  category: string;
  allowedFoods: { items: string[]; note?: string };
  forbiddenFoods: { items: string[]; note?: string };
  description?: string;
  instructions?: string;
  benefits?: string;
  allowedLiquids?: { items: string[]; note?: string };
  forbiddenLiquids?: { items: string[]; note?: string };
  ingredients?: string[];
  images?: string[];
  notes?: string;
}

export class CreateDietTemplateUseCase {
  constructor(private readonly repository: DietTemplateRepository) {}

  public async execute(request: CreateDietTemplateRequest): Promise<void> {
    const content = DietContent.create(
      request.name,
      request.category,
      request.description ?? '', 
      request.instructions ?? '',
      request.benefits ?? ''
    );

    const template = DietTemplate.create({
      content,
      allowedFoods: DietRestriction.create(request.allowedFoods.items, request.allowedFoods.note),
      forbiddenFoods: DietRestriction.create(
        request.forbiddenFoods.items,
        request.forbiddenFoods.note
      ),
      allowedLiquids: DietRestriction.create(
        request.allowedLiquids?.items ?? [],
        request.allowedLiquids?.note
      ),
      forbiddenLiquids: DietRestriction.create(
        request.forbiddenLiquids?.items ?? [],
        request.forbiddenLiquids?.note
      ),
      ingredients: request.ingredients ?? [],
      images: request.images ?? [],
      notes: request.notes,
      isActive: true,
    });

    await this.repository.save(template);
  }
}
