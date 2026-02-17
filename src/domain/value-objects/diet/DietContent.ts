export class DietContent {
  private constructor(
    public readonly name: string,
    public readonly category: string,
    public readonly description: string,
    public readonly instructions: string,
    public readonly benefits?: string
  ) {}

  public static create(
    name: string,
    category: string,
    description: string,
    instructions: string,
    benefits?: string
  ): DietContent {
    if (!name || name.trim().length < 3)
      throw new Error('Diet name must be at least 3 characters long.');
    if (!category || category.trim().length === 0) throw new Error('Category is required.');

    return new DietContent(
      name.trim(),
      category.trim(),
      description.trim(),
      instructions.trim(),
      benefits?.trim()
    );
  }
}
