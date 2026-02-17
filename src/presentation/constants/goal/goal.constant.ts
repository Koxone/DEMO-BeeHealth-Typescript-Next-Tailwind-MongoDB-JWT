import { TimelineEventTypeEnum } from '@/domain/enums';

export const GOAL_STATUS_UI_MAP: Record<
  | TimelineEventTypeEnum.GOAL_CREATED
  | TimelineEventTypeEnum.GOAL_FAILED
  | TimelineEventTypeEnum.GOAL_COMPLETED
  | TimelineEventTypeEnum.GOAL_CANCELLED,
  { label: string; className: string }
> = {
  [TimelineEventTypeEnum.GOAL_CREATED]: {
    label: 'Creada',
    className: 'bg-blue-100 text-blue-700',
  },
  [TimelineEventTypeEnum.GOAL_FAILED]: {
    label: 'No cumplida',
    className: 'bg-red-100 text-red-700',
  },
  [TimelineEventTypeEnum.GOAL_COMPLETED]: {
    label: 'Cumplida',
    className: 'bg-green-100 text-green-700',
  },
  [TimelineEventTypeEnum.GOAL_CANCELLED]: {
    label: 'Cancelada',
    className: 'bg-gray-100 text-gray-600',
  },
};
