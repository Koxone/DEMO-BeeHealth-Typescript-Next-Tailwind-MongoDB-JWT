'use client';

// Next, React and Other Libraries
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// UI Components
import { WorkoutCard, SearchBar, SharedSectionHeader } from './components';
import { ButtonSm } from '../../shared/buttons/Buttons';

// Custom Hooks
import { useAuth } from '@/presentation/hooks/auth';
import { useGetAllWorkouts } from '@/presentation/hooks/workout/';

// Feedback Components
import { LoadingState } from '@/presentation/ui/pages/main/shared/feedback/';
import { DeleteWorkoutModal, EditWorkoutModal, ViewWorkoutModal } from './components/modals';

// Enums, Types and Interfaces
import { WorkoutCategoryEnum } from '@/domain/enums/';
import { WorkoutActiveModalConstant } from '@/presentation/constants/workout/workout.constants';
import { WorkoutTemplateDTOPresentation } from '@/presentation/types';

export default function DoctorWorkoutsPage() {
  const [filterCategory, setFilterCategory] = useState(WorkoutCategoryEnum.ALL);
  const [searchTerm, setSearchTerm] = useState('');

  // Workout modal
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutTemplateDTOPresentation | null>(
    null
  );
  const [filteredWorkouts, setFilteredWorkouts] = useState<WorkoutTemplateDTOPresentation[]>([]);

  // ----------------------------------------------------------------
  // Router
  const router = useRouter();

  // Open Modal States
  const [activeModal, setActiveModal] = useState<WorkoutActiveModalConstant>(null);

  // Fetch all Workouts from Custom Hook
  const { data: allWorkoutsData, isLoading: isWorkoutsLoading } = useGetAllWorkouts();

  // Get current user from auth context
  const { currentUser, isLoading: isAuthLoading } = useAuth();

  // Loading State
  if (isWorkoutsLoading || isAuthLoading) {
    return <LoadingState />;
  }

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      {/* Section Header */}
      <SharedSectionHeader
        role={currentUser?.role}
        Icon="workouts"
        title={currentUser?.role === 'doctor' ? 'Gestion de Ejercicios' : 'Mis Ejercicios'}
        subtitle={
          currentUser?.role === 'doctor'
            ? 'Crea y personaliza ejercicios'
            : 'Ejercicios personalizados'
        }
      />

      {/* Filters and Search */}
      <div className="grid grid-cols-[1fr_auto] items-end gap-10">
        <SearchBar
          setFilteredWorkouts={setFilteredWorkouts}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          allWorkoutsData={allWorkoutsData}
          filterCategory={filterCategory}
        />

        {/* Create Workout Button */}
        <ButtonSm
          onClick={() => router.push('/doctor/workouts/create-workout')}
          className="mt-4"
          action="confirm"
        >
          Crear Ejercicio
        </ButtonSm>
      </div>

      {/* Workout grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts?.map((workout) => (
            <WorkoutCard
              key={workout.name}
              workout={workout}
              setActiveModal={setActiveModal}
              setSelectedWorkout={setSelectedWorkout}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
            <p className="text-lg font-semibold text-gray-700">No hay ejercicios registrados</p>
            <p className="text-gray-500">Crea un ejercicio nuevo para comenzar</p>
          </div>
        )}
      </div>

      {/* Open workout modal */}
      {activeModal === 'view' && (
        <ViewWorkoutModal workout={selectedWorkout} setActiveModal={setActiveModal} />
      )}

      {/* Delete modal */}
      {activeModal === 'delete' && (
        <DeleteWorkoutModal
          selectedWorkout={selectedWorkout}
          activeModal={activeModal}
          setActiveModal={setActiveModal}
        />
      )}

      {/* Edit modal */}
      {activeModal === 'edit' && (
        <EditWorkoutModal
          activeModal={activeModal}
          setSelectedWorkout={setSelectedWorkout}
          setActiveModal={setActiveModal}
          selectedWorkout={selectedWorkout}
        />
      )}
    </div>
  );
}
