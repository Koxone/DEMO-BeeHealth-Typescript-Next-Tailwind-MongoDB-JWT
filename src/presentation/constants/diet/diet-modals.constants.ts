import { CircleCheck, RefreshCcw, CircleX, History } from 'lucide-react';

export type DietActiveModalConstant = 'dietComplete' | 'dietRenew' | 'dietCancel' | 'dietEvent';

export const DIET_MODAL_CONFIG: Record<
  Exclude<DietActiveModalConstant, null>,
  {
    title: string;
    description: string;
    Icon: React.ElementType;
  }
> = {
  dietComplete: {
    title: 'Completar Dieta',
    description: 'Marca el plan de dieta como completado.',
    Icon: CircleCheck,
  },
  dietRenew: {
    title: 'Renovar Dieta',
    description: 'Registra la renovación del plan de dieta del paciente.',
    Icon: RefreshCcw,
  },
  dietCancel: {
    title: 'Cancelar Dieta',
    description: 'Cancela el plan de dieta asignado al paciente.',
    Icon: CircleX,
  },
  dietEvent: {
    title: 'Historial de Dieta',
    description: 'Detalles del evento relacionado con la dieta.',
    Icon: History,
  },
};
