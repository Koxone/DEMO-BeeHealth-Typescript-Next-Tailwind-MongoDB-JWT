'use client';

// Next, React and Other Libraries
import { Clock } from 'lucide-react';

// UI Components
import ActionsButtons from './components/ActionsButtons';

// Enums, Types and Interfaces
import { WorkoutDifficultyEnum, WorkoutCategoryEnum } from '@/domain/enums/';
import { WorkoutActiveModalConstant } from '@/presentation/constants/workout/workout.constants';
import { WorkoutTemplateDTOPresentation } from '@/presentation/types/workout.types';

// Constants, Mappers and Helpers
import {
  WorkoutDifficultyLabelMap,
  WorkoutCategoryLabelMap,
  workoutGetDifficultyColor,
} from '@/presentation/services/workout';

// Prop Types
interface WorkoutCardProps {
  workout: WorkoutTemplateDTOPresentation;
  setSelectedWorkout: (workout: WorkoutTemplateDTOPresentation) => void;
  setActiveModal: (modal: WorkoutActiveModalConstant) => void;
}

export default function WorkoutCard({
  workout,
  setSelectedWorkout,
  setActiveModal,
}: WorkoutCardProps) {
  return (
    <div
      onClick={() => {
        setSelectedWorkout(workout);
        setActiveModal('view');
      }}
      className="group hover:border-beehealth-blue-primary-solid bg-beehealth-body-main cursor-pointer overflow-hidden rounded-xl border-2 border-gray-200 shadow-sm transition-all duration-200 hover:shadow-lg active:scale-95"
    >
      {/* Main Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={workout?.images?.[0]}
          alt={workout?.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute top-3 right-3">
          <span
            className={`bg-beehealth-body-main/80 rounded-full px-2 py-1 text-xs font-medium shadow-sm backdrop-blur-sm ${workoutGetDifficultyColor(workout?.difficulty)}`}
          >
            {WorkoutDifficultyLabelMap[workout?.difficulty as WorkoutDifficultyEnum]}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="bg-beehealth-blue-primary-solid rounded-full px-2 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm">
            {WorkoutCategoryLabelMap[workout?.category as WorkoutCategoryEnum]}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-700 transition-colors duration-200 group-hover:text-blue-600">
          {workout?.name}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{workout?.duration} minutos</span>
        </div>

        {/* Doctor Actions */}
        <ActionsButtons
          onClick={() => {
            setSelectedWorkout(workout);
            setActiveModal('edit');
          }}
        />
      </div>
    </div>
  );
}
