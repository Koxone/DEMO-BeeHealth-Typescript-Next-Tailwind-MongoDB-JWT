import { DietContent } from '@/domain/value-objects/diet/DietContent';
import { DietRestriction } from '@/domain/value-objects/diet/DietRestriction';

export interface DietTemplateProps {
  content: DietContent;
  allowedFoods: DietRestriction;
  forbiddenFoods: DietRestriction;
  allowedLiquids: DietRestriction;
  forbiddenLiquids: DietRestriction;
  ingredients: string[];
  images: string[];
  notes?: string;
  isActive: boolean;
}

export class DietTemplate {
  private constructor(
    public readonly id: string,
    private props: DietTemplateProps
  ) {}

  // For NEW templates (no id yet)
  public static create(props: DietTemplateProps): DietTemplate {
    return new DietTemplate(null, props);
  }

  public static fromPersistence(id: string, props: DietTemplateProps): DietTemplate {
    return new DietTemplate(id, props);
  }

  public toValue() {
    return {
      id: this.id,
      ...this.props.content,
      allowedFoods: this.props.allowedFoods,
      forbiddenFoods: this.props.forbiddenFoods,
      allowedLiquids: this.props.allowedLiquids,
      forbiddenLiquids: this.props.forbiddenLiquids,
      ingredients: this.props.ingredients,
      images: this.props.images,
      notes: this.props.notes,
      isActive: this.props.isActive,
    };
  }

  // Behavior methods
  public activate(): void {
    this.props.isActive = true;
  }

  public deactivate(): void {
    this.props.isActive = false;
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.props.content.name;
  }

  getCategory(): string {
    return this.props.content.category;
  }

  getDescription(): string {
    return this.props.content.description;
  }

  getInstructions(): string {
    return this.props.content.instructions;
  }

  getBenefits(): string {
    return this.props.content.benefits;
  }

  getAllowedFoods(): DietRestriction {
    return this.props.allowedFoods;
  }

  getForbiddenFoods(): DietRestriction {
    return this.props.forbiddenFoods;
  }

  getAllowedLiquids(): DietRestriction {
    return this.props.allowedLiquids;
  }

  getForbiddenLiquids(): DietRestriction {
    return this.props.forbiddenLiquids;
  }

  getIngredients(): string[] {
    return this.props.ingredients;
  }

  getImages(): string[] {
    return this.props.images;
  }

  getNotes(): string | undefined {
    return this.props.notes;
  }

  getIsActive(): boolean {
    return this.props.isActive;
  }
}
