import { WorkoutActiveModalConstant } from '@/presentation/constants';
import { Dumbbell, Pencil, Trash2 } from 'lucide-react';

export const WORKOUT_MODAL_CONFIG: Record<
  Exclude<WorkoutActiveModalConstant, null>,
  {
    title: string;
    description: string;
    Icon: React.ElementType;
  }
> = {
  view: {
    title: 'Ver Entrenamiento',
    description: 'Visualiza los detalles del entrenamiento.',
    Icon: Dumbbell,
  },
  edit: {
    title: 'Editar Entrenamiento',
    description: 'Modifica los detalles del entrenamiento.',
    Icon: Pencil,
  },
  delete: {
    title: 'Eliminar Entrenamiento',
    description: 'Elimina el entrenamiento seleccionado.',
    Icon: Trash2,
  },
};
