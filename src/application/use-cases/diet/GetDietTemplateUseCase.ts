import { DietTemplateRepository } from '@/domain/repositories/diet/DietTemplateRepository';

export interface GetDietTemplateResponseType {
  id: string;
  name: string;
  category: string;
  description: string;
  instructions: string;
  benefits?: string;
  allowedFoods: { items: string[]; note?: string };
  forbiddenFoods: { items: string[]; note?: string };
  allowedLiquids: { items: string[]; note?: string };
  forbiddenLiquids: { items: string[]; note?: string };
  ingredients: string[];
  images: string[];
  notes?: string;
  isActive: boolean;
}

export class GetDietTemplateUseCase {
  constructor(private readonly repository: DietTemplateRepository) {}

  public async execute(id: string): Promise<GetDietTemplateResponseType> {
    const template = await this.repository.findById(id);

    if (!template) {
      throw new Error('Diet template not found.');
    }

    const data = template.toValue();

    return {
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
    };
  }
}
