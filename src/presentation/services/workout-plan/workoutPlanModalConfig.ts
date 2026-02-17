import { WorkoutPlanModalConstant } from '@/presentation/constants/workout-plan/workout-plan.constant';
import { Dumbbell, Pencil, Trash2 } from 'lucide-react';

export const WORKOUT_PLAN_MODAL_CONFIG: Record<
  Exclude<WorkoutPlanModalConstant, null>,
  {
    title: string;
    description: string;
    Icon: React.ElementType;
  }
> = {
  workoutComplete: {
    title: 'Ver Entrenamiento',
    description: 'Visualiza los detalles del entrenamiento.',
    Icon: Dumbbell,
  },
  workoutRenew: {
    title: 'Editar Entrenamiento',
    description: 'Modifica los detalles del entrenamiento.',
    Icon: Pencil,
  },
  workoutCancel: {
    title: 'Eliminar Entrenamiento',
    description: 'Elimina el entrenamiento seleccionado.',
    Icon: Trash2,
  },
  workoutEvent: {
    title: 'Evento de Entrenamiento',
    description: 'Visualiza los detalles del evento de entrenamiento.',
    Icon: Dumbbell,
  },
};
