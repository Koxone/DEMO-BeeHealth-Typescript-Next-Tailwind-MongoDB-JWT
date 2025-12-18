import { TimelineEventType } from '@/models/records/PatientTimeline';
import { CheckCircle, XCircle, RotateCcw, Clock, CirclePlus } from 'lucide-react';

const getActionBadge = (action: TimelineEventType) => {
  switch (action) {
    // Diet - Green palette
    case 'diet_assigned':
      return {
        label: 'Dieta Asignada',
        className: 'bg-indigo-400/80 border-indigo-600',
        icon: CirclePlus,
      };

    case 'diet_completed':
      return {
        label: 'Dieta Completada',
        className: 'bg-indigo-400/80 border-indigo-600',
        icon: CheckCircle,
      };

    case 'diet_removed':
      return {
        label: 'Dieta Cancelada',
        className: 'bg-indigo-400/80 border-indigo-600',
        icon: XCircle,
      };

    case 'diet_renewed':
      return {
        label: 'Dieta Reactivada',
        className: 'bg-indigo-400/80 border-indigo-600',
        icon: RotateCcw,
      };

    // Workout - Blue/Purple palette
    case 'workout_assigned':
      return {
        label: 'Entrenamiento Asignado',
        className: 'bg-purple-400/80 border-purple-600',
        icon: CirclePlus,
      };

    case 'workout_completed':
      return {
        label: 'Entrenamiento Completado',
        className: 'bg-purple-400/80 border-purple-600',
        icon: CheckCircle,
      };

    case 'workout_removed':
      return {
        label: 'Entrenamiento Cancelado',
        className: 'bg-purple-400/80 border-purple-600',
        icon: XCircle,
      };

    case 'workout_renewed':
      return {
        label: 'Entrenamiento Reactivado',
        className: 'bg-purple-400/80 border-purple-600',
        icon: RotateCcw,
      };

    default:
      return {
        label: 'Evento',
        className: 'bg-gray-400/80 border-gray-400',
        icon: Clock,
      };
  }
};

export { getActionBadge };

export const CATEGORIES = [
  'Datos Generales',
  'Antropometria',
  'Antecedentes Personales',
  'Patologias',
  'Antecedentes Personales No Patologicos',
  'Medicamentos',
  'Antecedentes Heredofamiliares',
  'Alimentacion',
  'Inmunizaciones',
  'Signos Vitales',
  'En esta consulta',
];

export const CATEGORY_BG_MAP: Record<string, string> = {
  'Datos Generales': 'bg-blue-100',
  Antropometria: 'bg-beehealth-blue-primary-solid',
  'Antecedentes Personales': 'bg-beehealth-yellow-primary-dark',
  Patologias: 'bg-beehealth-red-primary-solid',
  'Antecedentes Personales No Patologicos': 'bg-beehealth-orange-primary-solid',
  Medicamentos: 'bg-beehealth-purple-primary-solid',
  'Antecedentes Heredofamiliares': 'bg-beehealth-orange-primary-dark',
  Alimentacion: 'bg-lime-100',
  Inmunizaciones: 'bg-teal-100',
  'Signos Vitales': 'bg-emerald-100',
  'En esta consulta': 'bg-beehealth-green-primary-solid',
};
