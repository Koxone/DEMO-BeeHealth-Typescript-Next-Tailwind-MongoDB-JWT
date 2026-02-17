export class Email {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Email {
    if (!value.includes('@')) {
      throw new Error('Invalid email format');
    }

    if (!value.includes('.')) {
      throw new Error('Invalid email format');
    }

    return new Email(value.toLowerCase().trim());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
