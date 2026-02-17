// React
import { useMemo } from 'react';

// Types
import { WorkoutPlanDTOPresentation } from '@/presentation/types';
import { GetAllWorkoutTemplatesResponse } from '@/application/use-cases/workout/GetAllWorkoutTemplatesUseCase';

interface UseAssignWorkoutSelectionParams {
  allWorkoutsData?: GetAllWorkoutTemplatesResponse;
  patientWorkoutPlansData: WorkoutPlanDTOPresentation[];
  selectedWorkouts: string[];
  search: string;
}

export function useAssignWorkoutPlanFiltersForUi({
  allWorkoutsData,
  patientWorkoutPlansData,
  selectedWorkouts,
  search,
}: UseAssignWorkoutSelectionParams) {
  // Assigned workout ids
  const assignedWorkoutIds = useMemo(
    () => patientWorkoutPlansData.map((workout) => workout.workoutSnapshot.originalWorkoutId),
    [patientWorkoutPlansData]
  );

  // Active workout ids
  const activeWorkoutIds = useMemo(
    () =>
      patientWorkoutPlansData
        .filter((workout) => workout.status === 'active')
        .map((workout) => workout.workoutSnapshot.originalWorkoutId),
    [patientWorkoutPlansData]
  );

  // Filtered workouts
  const workouts = allWorkoutsData?.workouts ?? [];

  const filteredWorkouts = useMemo(
    () => workouts.filter((workout) => workout.name.toLowerCase().includes(search.toLowerCase())),
    [workouts, search]
  );

  // Block rule
  const isWorkoutBlocked = (workoutId: string) =>
    assignedWorkoutIds.includes(workoutId) || activeWorkoutIds.includes(workoutId);

  // Checked rule
  const isWorkoutChecked = (workoutId: string) =>
    selectedWorkouts.includes(workoutId) || isWorkoutBlocked(workoutId);

  return {
    filteredWorkouts,
    isWorkoutBlocked,
    isWorkoutChecked,
  };
}
