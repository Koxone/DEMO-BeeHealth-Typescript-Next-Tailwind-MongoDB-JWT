export interface DietRestrictionDTOPresentation {
  items: string[];
  note?: string;
}

export interface DietTemplateDTOPresentation {
  id: string;
  name: string;
  category: string;
  description: string;
  instructions: string;
  benefits?: string;
  allowedFoods: DietRestrictionDTOPresentation;
  forbiddenFoods: DietRestrictionDTOPresentation;
  allowedLiquids: DietRestrictionDTOPresentation;
  forbiddenLiquids: DietRestrictionDTOPresentation;
  ingredients: string[];
  images: string[];
  notes?: string;
  isActive: boolean;
}

export type SaveDietTemplateDTOPresentation = Omit<DietTemplateDTOPresentation, 'id' | 'isActive'>;
