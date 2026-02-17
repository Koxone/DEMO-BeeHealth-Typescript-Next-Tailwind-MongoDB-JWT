// React
import { useMemo } from 'react';

// Types
import { GetAllDietTemplatesResponse } from '@/application/use-cases/diet/GetAllDietTemplatesUseCase';
import { DietPlanResponseDTOPresentation } from '@/presentation/types';

interface UseAssignDietSelectionParams {
  allDietsData?: GetAllDietTemplatesResponse;
  patientDietPlansData: DietPlanResponseDTOPresentation[];
  selectedDiets: string[];
  search: string;
}

export function useAssignDietPlanFiltersForUi({
  allDietsData,
  patientDietPlansData,
  selectedDiets,
  search,
}: UseAssignDietSelectionParams) {
  // Assigned diet ids
  const assignedDietIds = useMemo(
    () => patientDietPlansData.map((diet) => diet.dietSnapshot.originalDietId),
    [patientDietPlansData]
  );

  // Active diet ids
  const activeDietIds = useMemo(
    () =>
      patientDietPlansData
        .filter((diet) => diet.status === 'active')
        .map((diet) => diet.dietSnapshot.originalDietId),
    [patientDietPlansData]
  );

  // Filtered diets
  const diets = allDietsData?.diets ?? [];

  const filteredDiets = useMemo(
    () => diets.filter((diet) => diet.name.toLowerCase().includes(search.toLowerCase())),
    [diets, search]
  );

  // Block rule
  const isDietBlocked = (dietId: string) =>
    assignedDietIds.includes(dietId) || activeDietIds.includes(dietId);

  // Checked rule
  const isDietChecked = (dietId: string) => selectedDiets.includes(dietId) || isDietBlocked(dietId);

  return {
    filteredDiets,
    isDietBlocked,
    isDietChecked,
  };
}
