export class DietRestriction {
  private constructor(
    public readonly items: string[],
    public readonly note?: string
  ) {}

  public static create(items: string[], note?: string): DietRestriction {
    const cleanItems = [
      ...new Set(items.map((i) => i.trim().toLowerCase()).filter((i) => i !== '')),
    ];
    return new DietRestriction(cleanItems, note?.trim());
  }
}
