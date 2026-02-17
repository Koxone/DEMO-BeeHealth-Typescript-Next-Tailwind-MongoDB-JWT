// Value Object
export class Size {
  // Value
  private readonly value: number;

  // Constructor
  private constructor(value: number) {
    this.value = value;
  }

  // Factory
  static create(value: number): Size {
    if (value <= 0) {
      throw new Error('Size must be greater than zero');
    }

    return new Size(value);
  }

  // Getter
  getValue(): number {
    return this.value;
  }

  // Comparison
  equals(other: Size): boolean {
    return this.value === other.value;
  }
}
