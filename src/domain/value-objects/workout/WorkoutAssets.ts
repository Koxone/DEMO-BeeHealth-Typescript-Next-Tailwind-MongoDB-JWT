export class WorkoutAssets {
  private constructor(
    public readonly instructions: string[],
    public readonly images: string[],
    public readonly video: string,
    public readonly benefits: string[],
    public readonly cautions: string[]
  ) {}

  public static create(
    instructions: string[],
    images: string[],
    video: string,
    benefits: string[],
    cautions: string[]
  ): WorkoutAssets {
    if (instructions.length === 0) throw new Error('At least one instruction is required.');
    return new WorkoutAssets(instructions, images, video, benefits, cautions);
  }
}
