export class MoneyValueObject {
  private readonly amount: number;
  private readonly currency: string;

  constructor(amount: number, currency: string = 'MXN') {
    if (amount < 0) throw new Error('Amount cannot be negative');
    this.amount = amount;
    this.currency = currency;
  }

  getAmount(): number {
    return this.amount;
  }
  getCurrency(): string {
    return this.currency;
  }
}
