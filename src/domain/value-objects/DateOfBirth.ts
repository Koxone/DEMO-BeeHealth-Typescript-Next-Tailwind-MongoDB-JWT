export class DateOfBirth {
  private readonly value: Date;

  constructor(date: string | Date) {
    this.value = new Date(date);
  }

  public getAge(): number {
    const today = new Date();

    let age = today.getFullYear() - this.value.getFullYear();

    const monthDiff = today.getMonth() - this.value.getMonth();
    const dayDiff = today.getDate() - this.value.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }

  public getValue(): Date {
    return this.value;
  }
}
