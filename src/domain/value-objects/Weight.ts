export class Weight {
  // Value
  private readonly value: number;

  // Constructor
  private constructor(value: number) {
    this.value = value;
  }

  // Factory
  static create(value: number): Weight {
    if (value <= 0) {
      throw new Error('Weight must be greater than zero');
    }

    return new Weight(value);
  }

  // Getter
  getValue(): number {
    return this.value;
  }

  // Comparison
  equals(other: Weight): boolean {
    return this.value === other.value;
  }
}
