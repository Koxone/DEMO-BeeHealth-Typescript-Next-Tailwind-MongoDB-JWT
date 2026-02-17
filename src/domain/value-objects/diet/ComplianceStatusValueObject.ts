import { ComplianceStatusEnum } from '@/domain/enums/';

export class ComplianceStatusValueObject {
  private readonly value: ComplianceStatusEnum;

  constructor(value: ComplianceStatusEnum) {
    const validStatuses = [
      ComplianceStatusEnum.PENDING,
      ComplianceStatusEnum.COMPLETED,
      ComplianceStatusEnum.PARTIAL,
      ComplianceStatusEnum.CANCELLED,
    ];

    // Validation
    if (!validStatuses.includes(value)) {
      throw new Error(`Invalid compliance status: ${value}`);
    }

    this.value = value;
  }
}
