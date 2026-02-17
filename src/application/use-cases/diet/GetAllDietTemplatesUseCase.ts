import { GetDietTemplateResponseType } from './GetDietTemplateUseCase';
import { DietTemplateRepository } from '@/domain/repositories/diet/DietTemplateRepository';

// Prop Types
export interface GetAllDietTemplatesResponse {
  diets: GetDietTemplateResponseType[];
}

export class GetAllDietTemplatesUseCase {
  constructor(private readonly repository: DietTemplateRepository) {}

  public async execute(): Promise<GetAllDietTemplatesResponse> {
    const templates = await this.repository.findAll();

    if (!templates) {
      throw new Error('Diet templates not found.');
    }

    const data = templates.map((template) => template.toValue());

    return {
      diets: data.map((data) => ({
        id: data.id,
        name: data.name,
        category: data.category,
        description: data.description,
        instructions: data.instructions,
        benefits: data.benefits,
        allowedFoods: {
          items: data.allowedFoods.items,
          note: data.allowedFoods.note,
        },
        forbiddenFoods: {
          items: data.forbiddenFoods.items,
          note: data.forbiddenFoods.note,
        },
        allowedLiquids: {
          items: data.allowedLiquids.items,
          note: data.allowedLiquids.note,
        },
        forbiddenLiquids: {
          items: data.forbiddenLiquids.items,
          note: data.forbiddenLiquids.note,
        },
        ingredients: data.ingredients,
        images: data.images,
        notes: data.notes,
        isActive: data.isActive,
      })),
    };
  }
}
