import { ComplianceStatusEnum } from '@/domain/enums/';

export const dietComplianceStylesConstant: {
  value: ComplianceStatusEnum;
  label: string;
  color: string;
}[] = [
  {
    value: ComplianceStatusEnum.COMPLETED,
    label: 'Cumplió',
    color: 'bg-green-100 text-green-700 border-green-300',
  },
  {
    value: ComplianceStatusEnum.PARTIAL,
    label: 'Parcial',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  },
  {
    value: ComplianceStatusEnum.CANCELLED,
    label: 'No cumplió',
    color: 'bg-red-100 text-red-700 border-red-300',
  },
  {
    value: ComplianceStatusEnum.PENDING,
    label: 'Pendiente',
    color: 'bg-gray-100 text-gray-800 border-gray-300',
  },
];

export const dietComplianceLabelMapConstant: Record<ComplianceStatusEnum, string> = {
  [ComplianceStatusEnum.PENDING]: 'Pendiente',
  [ComplianceStatusEnum.COMPLETED]: 'Completada',
  [ComplianceStatusEnum.PARTIAL]: 'Parcial',
  [ComplianceStatusEnum.CANCELLED]: 'Cancelada',
};
