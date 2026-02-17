import { WorkoutContent } from '@/domain/value-objects/workout/WorkoutContent';
import { WorkoutAssets } from '@/domain/value-objects/workout/WorkoutAssets';
import { WorkoutDifficultyEnum, WorkoutCategoryEnum } from '@/domain/enums/';

export interface WorkoutProps {
  content: WorkoutContent;
  assets: WorkoutAssets;
  clinicalRecordId?: string;
  isActive: boolean;
}

export class WorkoutTemplate {
  private constructor(
    public readonly id: string | null,
    private props: WorkoutProps
  ) {}

  public static create(props: WorkoutProps): WorkoutTemplate {
    return new WorkoutTemplate(null, props);
  }

  public static fromPersistence(id: string, props: WorkoutProps): WorkoutTemplate {
    return new WorkoutTemplate(id, props);
  }

  public activate(): void {
    this.props.isActive = true;
  }

  public deactivate(): void {
    this.props.isActive = false;
  }

  public toValue() {
    return {
      id: this.id,
      ...this.props.content,
      ...this.props.assets,
      clinicalRecordId: this.props.clinicalRecordId,
      isActive: this.props.isActive,
    };
  }

  // Getters
  public getName(): string {
    return this.props.content.name;
  }
  public getDifficulty(): WorkoutDifficultyEnum {
    return this.props.content.difficulty;
  }
  public getInstructions(): string[] {
    return this.props.assets.instructions;
  }
  public getIsActive(): boolean {
    return this.props.isActive;
  }
  public getId(): string | null {
    return this.id;
  }
  public getCategory(): WorkoutCategoryEnum {
    return this.props.content.category;
  }
  public getImages(): string[] {
    return this.props.assets.images;
  }
}
