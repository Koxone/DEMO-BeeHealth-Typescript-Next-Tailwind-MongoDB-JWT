'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';
import WorkoutCard from './components/workoutCard/WorkoutCard';

// Hooks
import { useGetAllWorkouts } from '@/hooks/workouts/get/useGetAllWorkouts';
import { useDeleteWorkout } from '@/hooks/workouts/delete/useDeleteWorkout';

// Feedback Components
import SharedModalOpenWorkout from '@/components/shared/workouts/SharedModalOpenWorkout';
import ModalDelete from './components/modals/delete/ModalDelete';
import ModalCreateWorkout from './components/modals/create/ModalCreateWorkout';
import ModalEditWorkout from './components/modals/edit/ModalEditWorkout';
import SuccessModal from '@/components/shared/feedback/SuccessModal';
import LoadingState from '@/components/shared/feedback/LoadingState';
import ModalAssignWorkout from './components/modals/assign/ModalAssignWorkout';

export default function DoctorWorkouts({ role }) {
  // Get Workouts Hook
  const { workoutData, isLoading, error, refetch: fetchWorkouts } = useGetAllWorkouts();

  // Delete Workout Hook
  const { deleteWorkout } = useDeleteWorkout();

  // Local States
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [filterCategorie, setFilterCategorie] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Assign Workout Modal
  const [showAssignModal, setShowAssignModal] = useState<boolean>(false);
  const [workoutToAssign, setWorkoutToAssign] = useState<null | (typeof workoutData)[0]>(null);

  // Delete Workout Modal
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [workoutToDelete, setWorkoutToDelete] = useState<null | (typeof workoutData)[0]>(null);

  // Edit Workout Modal
  const [editingWorkout, setEditingWorkout] = useState<null | (typeof workoutData)[0]>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  // Create Workout Modal
  const [showCreateWorkoutModal, setShowCreateWorkoutModal] = useState<boolean>(false);

  // Workout modal
  const [seletctedWorkout, setSelectedWorkout] = useState<null | (typeof workoutData)[0]>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Available categories
  const categories = ['Todos', 'Fuerza', 'Cardio', 'Core', 'Flexibilidad', 'Movilidad'];

  // Filter workouts
  const filteredWorkouts = workoutData.filter((e) => {
    const matchCategorie = filterCategorie === 'Todos' || e.type === filterCategorie;
    const matchSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategorie && matchSearch;
  });

  // Delete handler
  const handleDelete = async () => {
    if (!workoutToDelete) return;
    const result = await deleteWorkout({ id: workoutToDelete._id });
    if (result) {
      await fetchWorkouts();
    }
    setShowDeleteModal(false);
  };

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      {/* Success Modal */}
      <SuccessModal
        message="Ejercicio editado exitosamente"
        setShowSuccessModal={setShowSuccessModal}
        showSuccessModal={showSuccessModal}
        title="Ejercicio Actualizado"
      />

      {/* Section Header */}
      <SharedSectionHeader
        role={role}
        Icon="workouts"
        newWorkout
        setEditingWorkout={setEditingWorkout}
        setShowCreateWorkoutModal={setShowCreateWorkoutModal}
        title={role === 'doctor' ? 'Gestion de Ejercicios' : 'Mis Ejercicios'}
        subtitle={role === 'doctor' ? 'Crea y personaliza ejercicios' : 'Ejercicios Personalizados'}
      />

      {/* Filters and Search */}
      <div className="flex flex-col gap-3 md:flex-row">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategorie(cat)}
              className={`rounded-lg px-4 py-2 font-medium ${
                filterCategorie === cat
                  ? 'bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover text-white'
                  : 'bg-beehealth-body-main hover:bg-beehealth-body-main border border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pr-3 pl-10 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Workout grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => (
            <WorkoutCard
              key={workout._id}
              workout={workout}
              onClickAssign={(e) => {
                setWorkoutToAssign(workout);
                setShowAssignModal(true);
              }}
              handleEdit={(e) => {
                setEditingWorkout(e);
                setShowEditModal(true);
              }}
              onOpen={() => {
                setSelectedWorkout(workout);
                setCurrentImageIndex(0);
              }}
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
      {seletctedWorkout && (
        <SharedModalOpenWorkout
          workout={seletctedWorkout}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          onClose={() => setSelectedWorkout(null)}
        />
      )}

      {/* Delete modal */}
      {showDeleteModal && (
        <ModalDelete
          workoutToDelete={workoutToDelete}
          // setSeletctedWorkout={setSelectedWorkout}
          handleDelete={handleDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}

      {/* Edit modal */}
      {showEditModal && (
        <ModalEditWorkout
          setShowDeleteModal={setShowDeleteModal}
          fetchWorkouts={fetchWorkouts}
          setShowEditModal={setShowEditModal}
          editingWorkout={editingWorkout}
          setShowSuccessModal={setShowSuccessModal}
          setWorkoutToDelete={setWorkoutToDelete}
        />
      )}

      {/* Create modal */}
      {showCreateWorkoutModal && (
        <ModalCreateWorkout
          setShowCreateModal={setShowCreateWorkoutModal}
          fetchWorkouts={fetchWorkouts}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}

      {/* Assign Modal */}
      {showAssignModal && (
        <ModalAssignWorkout
          workoutToAssign={workoutToAssign}
          setShowAssignModal={setShowAssignModal}
          setShowSuccessModal={setShowSuccessModal}
          refetch={fetchWorkouts}
        />
      )}
    </div>
  );
}
