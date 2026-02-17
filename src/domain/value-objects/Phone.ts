export class Phone {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Phone {
    if (!/^\d{7,15}$/.test(value)) {
      throw new Error('Phone must be 7-15 digits');
    }
    return new Phone(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Phone): boolean {
    return this.value === other.value;
  }
}
