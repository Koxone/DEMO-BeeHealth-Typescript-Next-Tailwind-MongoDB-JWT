import { CheckCircle, Clock, RotateCcw, XCircle } from 'lucide-react';
import { TimelineEventTypeEnum } from '@/domain/enums/';

export const dietGetActionBadgeConstant = (action: TimelineEventTypeEnum) => {
  switch (action) {
    // Diet
    case TimelineEventTypeEnum.DIET_ASSIGNED:
      return {
        label: 'Asignada',
        className: 'bg-blue-100 text-blue-700',
        icon: CheckCircle,
      };

    case TimelineEventTypeEnum.DIET_COMPLETED:
      return {
        label: 'Completada',
        className: 'bg-green-100 text-green-700',
        icon: CheckCircle,
      };

    case TimelineEventTypeEnum.DIET_CANCELLED:
      return {
        label: 'Cancelada',
        className: 'bg-red-100 text-red-700',
        icon: XCircle,
      };

    case TimelineEventTypeEnum.DIET_RENEWED:
      return {
        label: 'Renovada',
        className: 'bg-emerald-100 text-emerald-700',
        icon: RotateCcw,
      };

    // Workout
    case TimelineEventTypeEnum.WORKOUT_ASSIGNED:
      return {
        label: 'Asignado',
        className: 'bg-blue-100 text-blue-700',
        icon: CheckCircle,
      };

    case TimelineEventTypeEnum.WORKOUT_COMPLETED:
      return {
        label: 'Completado',
        className: 'bg-green-100 text-green-700',
        icon: CheckCircle,
      };

    case TimelineEventTypeEnum.WORKOUT_CANCELLED:
      return {
        label: 'Cancelado',
        className: 'bg-red-100 text-red-700',
        icon: XCircle,
      };

    case TimelineEventTypeEnum.WORKOUT_RENEWED:
      return {
        label: 'Reactivado',
        className: 'bg-emerald-100 text-emerald-700',
        icon: RotateCcw,
      };

    default:
      return {
        label: 'Evento',
        className: 'bg-gray-100 text-gray-700',
        icon: Clock,
      };
  }
};
