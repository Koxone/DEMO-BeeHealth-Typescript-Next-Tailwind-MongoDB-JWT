import { useMemo } from 'react';
import { calculateResolution } from '@/domain/services/goal/GoalProgressService';
import { GoalDTOPresentation } from '@/presentation/types';
import { ConsultationDTOPresentation } from '@/presentation/types';

export const useGoalCalculations = (
  goal: GoalDTOPresentation,
  consultation: ConsultationDTOPresentation | null | undefined
) => {
  return useMemo(() => {
    if (!consultation) return 'IN_PROGRESS';

    // Buscamos la respuesta del peso (ID 1) en el objeto consultation
    const weightAnswer = consultation.answers.find((a) => a.questionId === 7);
    const currentWeight = weightAnswer ? Number(weightAnswer.value) : undefined;

    // Si no hay peso registrado en esta consulta específica, no podemos calcular
    if (currentWeight === undefined || isNaN(currentWeight)) {
      return 'IN_PROGRESS';
    }

    // Ejecutamos la lógica de dominio compartida
    return calculateResolution(goal.targetValue, currentWeight);
  }, [goal, consultation]);
};
