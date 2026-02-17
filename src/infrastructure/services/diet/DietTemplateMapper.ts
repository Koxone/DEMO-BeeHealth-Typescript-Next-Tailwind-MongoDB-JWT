import { DietTemplate } from '@/domain/entities/diet/DietTemplate';
import { DietContent } from '@/domain/value-objects/diet/DietContent';
import { DietRestriction } from '@/domain/value-objects/diet/DietRestriction';

export class DietTemplateMapper {
  public static toDomain(raw: any): DietTemplate {
    const content = DietContent.create(
      raw.name,
      raw.category,
      raw.description,
      raw.instructions,
      raw.benefits
    );

    return DietTemplate.fromPersistence(raw._id.toString(), {
      content,
      allowedFoods: DietRestriction.create(raw.allowedFoods.items, raw.allowedFoods.note),
      forbiddenFoods: DietRestriction.create(raw.forbiddenFoods.items, raw.forbiddenFoods.note),
      allowedLiquids: DietRestriction.create(
        raw.allowedLiquids?.items ?? [],
        raw.allowedLiquids?.note
      ),
      forbiddenLiquids: DietRestriction.create(
        raw.forbiddenLiquids?.items ?? [],
        raw.forbiddenLiquids?.note
      ),
      ingredients: raw.ingredients,
      images: raw.images,
      notes: raw.notes,
      isActive: raw.isActive,
    });
  }

  public static toPersistence(template: DietTemplate) {
    const data = template.toValue();

    return {
      ...(template.id && { _id: template.id }),

      name: template.getName(),
      category: template.getCategory(),
      description: template.getDescription(),
      instructions: template.getInstructions(),
      benefits: template.getBenefits(),

      allowedFoods: { items: data.allowedFoods.items, note: data.allowedFoods.note },
      forbiddenFoods: { items: data.forbiddenFoods.items, note: data.forbiddenFoods.note },
      allowedLiquids: { items: data.allowedLiquids.items, note: data.allowedLiquids.note },
      forbiddenLiquids: { items: data.forbiddenLiquids.items, note: data.forbiddenLiquids.note },

      ingredients: data.ingredients,
      images: data.images,
      notes: data.notes,
      isActive: data.isActive,
    };
  }
}
