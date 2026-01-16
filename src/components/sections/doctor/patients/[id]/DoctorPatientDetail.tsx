'use client';

// Library Imports
import { useState } from 'react';
import { IClinicalRecord, TabName } from '@/@types';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import TabsNav from './components/TabsNav';
import BackButton from './components/BackButton';
import GoalsTab from './components/tabs/goals/GoalsTab';
import DietsTab from './components/tabs/diets/DietsTab';
import ConsultsTab from './components/tabs/consults/ConsultsTab';
import WorkoutsTab from './components/tabs/workouts/WorkoutsTab';
import PatientHeader from './components/patientHeader/PatientHeader';

// Feedback Components
import ErrorState from '@/components/shared/feedback/ErrorState';
import SuccessModal from '@/components/shared/feedback/SuccessModal';
import LoadingState from '@/components/shared/feedback/LoadingState';
import CreateGoalModal from './components/modals/create-goal-modal/CreateGoalModal';
import EditRecordModal from './components/modals/edit-record-modal/EditRecordModal';
import FullHistoryModal from './components/modals/full-history-modal/FullHistoryModal';
import ClinicalRecordModal from './components/modals/historyModal/ClinicalRecordModal';
import DeleteRecordModal from './components/modals/delete-record-modal/DeleteRecordModal';
import RemoveDietModal from './components/tabs/diets/components/remove-diet-modal/RemoveDietModal';
import EditPatientModal from '@/components/sections/employee/patients/components/EditPatientModal';
import CreateFirstRecordModal from './components/modals/create-first-record-modal/CreateFirstRecordModal';
import RemoveWorkoutModal from './components/tabs/workouts/components/remove-diet-modal/RemoveWorkoutModal';
import DoctorCreateAppointmentModal from './components/modals/createAppointmentModal/DoctorCreateAppointmentModal';
import DietEventsHistoryModal from './components/tabs/diets/components/diet-events-history-modal/DietEventsHistoryModal';
import WorkoutEventsHistoryModal from './components/tabs/workouts/components/diet-events-history-modal/WorkoutEventsHistoryModal';

// Custom Hooks
import { useEditUser } from '@/@hooks/users/useEditUser';
import { useGetUserById } from '@/@hooks/users/useGetUserById';
import { useGetUserEvents } from '@/@hooks/timeline/useGetUserEvents';
import { useGetPatientGoals } from '@/@hooks/users/useGetPatientGoals';
import { useGetAllPatients } from '@/@hooks/patients/get/useGetAllPatients';
import { useGetAllQuestions } from '@/@hooks/clinicalRecords/get/useGetAllQuestions';
import { useGetAllDietsFromPatient } from '@/@hooks/diets/get/useGetAllDietsFromPatient';
import { useEditClinicalRecord } from '@/@hooks/clinicalRecords/edit/useEditClinicalRecord';
import { useDeleteClinicalRecord } from '@/@hooks/clinicalRecords/delete/useDeleteClinicalRecord';
import { useGetAllWorkoutsFromPatient } from '@/@hooks/workouts/get/useGetAllWorkoutsFromPatient';
import { useGetPatientClinicalRecords } from '@/@hooks/clinicalRecords/get/useGetPatientClinicalRecords';
import { useRemovePatientGoal } from '@/@hooks/users/useRemoveGoal';

export default function DoctorPatientDetail({ patient, specialty }) {
  // Library Hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ id: string }>();

  // URL Params
  const id = params.id as string;
  const recordId = searchParams.get('recordId');

  // Patient Clinical Record
  const [selectedRecord, setSelectedRecord] = useState<IClinicalRecord | null>(null);

  // Fetch Patient Clinical Records
  const {
    error,
    isLoading,
    data: patientRecord,
    refetch: fetchRecord,
  } = useGetPatientClinicalRecords(id);
  const currentPatientInfo = patientRecord?.[0];

  // Fetch Patient Diets
  const {
    dietsData,
    refetch: refetchDiets,
    error: dietsError,
    isLoading: dietsLoading,
  } = useGetAllDietsFromPatient(id?.toString());

  // Fetch Patient Workouts
  const {
    workoutsData,
    error: patientWorkoutsError,
    refetch: refetchPatientWorkouts,
    isLoading: patientWorkoutsLoading,
  } = useGetAllWorkoutsFromPatient(id?.toString());

  // Fetch Patient Info
  const {
    userData,
    error: userError,
    refetch: refetchUser,
    isLoading: userLoading,
  } = useGetUserById(id);

  // Fetch Patient Timeline Events
  const {
    events,
    error: timelineError,
    refetch: refetchTimeline,
    isLoading: timelineLoading,
  } = useGetUserEvents(id);

  // Fetch Questions
  const {
    questions,
    error: questionsError,
    refetch: refetchQuestions,
    loading: questionsLoading,
  } = useGetAllQuestions();

  // Edit User Info
  const { isPending, mutate: editUser } = useEditUser(id);

  // Get Patient Goals
  const {
    error: goalsError,
    data: goalsData,
    refetch: refetchGoals,
    isLoading: goalsLoading,
  } = useGetPatientGoals(id);

  // Remove Patient Goals with Custom Hook
  const removeGoals = useRemovePatientGoal();

  // Success Modal
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [successTitle, setSuccessTitle] = useState<string>('Consulta registrada');
  const [successMessage, setSuccessMessage] = useState<string>(
    'La operación se ha realizado con éxito.'
  );

  // Short History Modal States
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [historyMode, setHistoryMode] = useState<'create' | 'view' | 'edit'>('view');

  // Edit Record Modal States
  const { editClinicalRecord } = useEditClinicalRecord();
  const [showEditRecordModal, setShowEditRecordModal] = useState<boolean>(false);

  // Delete Record Modal
  const { deleteClinicalRecord } = useDeleteClinicalRecord();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  // Create Modals
  const [showCreateGoalModal, setShowCreateGoalModal] = useState<boolean>(false);
  const [showFullHistoryModal, setShowFullHistoryModal] = useState<boolean>(false);
  const [showCreateAppointmentModal, setShowCreateAppointmentModal] = useState<boolean>(false);
  const [showCreateFirstRecordModal, setShowCreateFirstRecordModal] = useState<boolean>(false);

  // Diets Events History Card Feedback Modal States
  const [selectedHistoryCard, setSelectedHistoryCard] = useState<any>(null);
  const [showHistoryCardFeedbackModal, setShowHistoryCardFeedbackModal] = useState<boolean>(false);

  // Workouts Events History Card Feedback Modal States
  const [selectedWorkoutHistoryCard, setSelectedWorkoutHistoryCard] = useState<any>(null);
  const [showWorkoutHistoryCardFeedbackModal, setShowWorkoutHistoryCardFeedbackModal] =
    useState<boolean>(false);

  // Remove Diet Modal States
  const [dietToDelete, setDietToDelete] = useState<any>(null);
  const [showRemoveDietModal, setShowRemoveDietModal] = useState<boolean>(false);

  // Remove Workouts Modal States
  const [workoutToRemove, setWorkoutToRemove] = useState<any>(null);
  const [showRemoveWorkoutModal, setShowRemoveWorkoutModal] = useState<boolean>(false);

  // Editing Patient Modal States
  const { patients, refetch } = useGetAllPatients();
  const [showEditPatientModal, setShowEditPatientModal] = useState<boolean>(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patient?._id || '');

  // Tabs Nav
  const activeTab = (searchParams.get('tab') as TabName) ?? 'Consultas';
  const handleTabChange = (tab: TabName) => {
    const params = new URLSearchParams();
    params.set('tab', tab);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // ConsultsTab Handlers
  const onOpen = (record, readOnly) => {
    setIsReadOnly(readOnly);
    setSelectedRecord(record);
    setShowHistoryModal(true);
    setHistoryMode(readOnly ? 'view' : 'edit');
  };

  const onEdit = (record, readOnly) => {
    setIsReadOnly(readOnly);
    setSelectedRecord(record);
    setShowEditRecordModal(true);
    setHistoryMode(readOnly ? 'view' : 'edit');
  };

  const onDelete = (record) => {
    setSelectedRecord(record);
    setShowDeleteModal(true);
  };

  const onCreateNew = () => {
    setShowCreateFirstRecordModal(true);
  };

  const onAdd = () => {
    setIsReadOnly(false);
    setHistoryMode('create');
    setShowHistoryModal(true);
    const lastRecord = patientRecord?.[0] || null;
    setSelectedRecord(lastRecord);
  };

  // Loading State
  if (
    isLoading ||
    userLoading ||
    goalsLoading ||
    dietsLoading ||
    timelineLoading ||
    questionsLoading ||
    patientWorkoutsLoading
  ) {
    return <LoadingState />;
  }

  // Error State
  if (
    error ||
    userError ||
    dietsError ||
    goalsError ||
    timelineError ||
    questionsError ||
    patientWorkoutsError
  ) {
    return <ErrorState />;
  }

  return (
    <div className="h-full space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="grid grid-rows-[auto_1fr]">
        <BackButton />
        <PatientHeader
          dietsData={dietsData}
          workoutsData={workoutsData}
          patientRecord={patientRecord}
          setShowEditPatientModal={setShowEditPatientModal}
          onCreateNew={() => setShowCreateFirstRecordModal(true)}
          onClickFullHistory={() => setShowFullHistoryModal(true)}
          onClickNew={() => setShowCreateAppointmentModal(true)}
        />
      </div>

      {/* Tabs Nav */}
      <TabsNav activeTab={activeTab} onChangeTab={handleTabChange} />

      {/* Consults Tab */}
      {activeTab === 'Consultas' && (
        <ConsultsTab
          onAdd={onAdd}
          patientId={id}
          onEdit={onEdit}
          onOpen={onOpen}
          events={events}
          onDelete={onDelete}
          specialty={specialty}
          questions={questions}
          onCreateNew={onCreateNew}
          fetchRecord={fetchRecord}
          patientRecord={patientRecord}
          setShowHistoryModal={setShowHistoryModal}
          setShowCreateGoalModal={setShowCreateGoalModal}
        />
      )}

      {/* Diets Tab */}
      {activeTab === 'Dietas' && (
        <DietsTab
          patientId={id}
          events={events}
          recordId={recordId}
          userData={userData}
          dietsData={dietsData}
          dietsError={dietsError}
          refetchDiets={refetchDiets}
          dietsLoading={dietsLoading}
          timelineError={timelineError}
          setDietToDelete={setDietToDelete}
          refetchTimeline={refetchTimeline}
          timelineLoading={timelineLoading}
          setShowRemoveDietModal={setShowRemoveDietModal}
          setSelectedHistoryCard={setSelectedHistoryCard}
          setShowHistoryCardFeedbackModal={setShowHistoryCardFeedbackModal}
        />
      )}

      {/* Workouts Tab */}
      {activeTab === 'Ejercicios' && (
        <WorkoutsTab
          patientId={id}
          events={events}
          recordId={recordId}
          userData={userData}
          workoutsData={workoutsData}
          timelineError={timelineError}
          refetchTimeline={refetchTimeline}
          timelineLoading={timelineLoading}
          setWorkoutToRemove={setWorkoutToRemove}
          patientWorkoutsError={patientWorkoutsError}
          refetchPatientWorkouts={refetchPatientWorkouts}
          patientWorkoutsLoading={patientWorkoutsLoading}
          setShowRemoveWorkoutModal={setShowRemoveWorkoutModal}
          setSelectedWorkoutHistoryCard={setSelectedWorkoutHistoryCard}
          setShowWorkoutHistoryCardFeedbackModal={setShowWorkoutHistoryCardFeedbackModal}
        />
      )}

      {/* Goals Tab */}
      {activeTab === 'Metas' && (
        <GoalsTab
          goalsData={goalsData}
          refetchGoals={refetchGoals}
          removeGoals={removeGoals}
          setShowSuccessModal={setShowSuccessModal}
          setSuccessTitle={setSuccessTitle}
          setSuccessMessage={setSuccessMessage}
          setShowCreateGoalModal={setShowCreateGoalModal}
        />
      )}

      {/* Full History Modal */}
      {showFullHistoryModal && (
        <FullHistoryModal
          patientId={id}
          specialty={specialty}
          record={selectedRecord}
          fetchRecord={fetchRecord}
          setShowSuccessModal={setShowSuccessModal}
          setShowFullHistoryModal={setShowFullHistoryModal}
          onClose={() => setShowFullHistoryModal(false)}
        />
      )}

      {/* Short History Modal */}
      {showHistoryModal && (
        <ClinicalRecordModal
          patientId={id}
          mode={historyMode}
          specialty={specialty}
          readOnly={isReadOnly}
          record={selectedRecord}
          fetchRecord={fetchRecord}
          setShowSuccessModal={setShowSuccessModal}
          onClose={() => setShowHistoryModal(false)}
        />
      )}

      {/* Create First Record Modal */}
      {showCreateFirstRecordModal && (
        <CreateFirstRecordModal
          fetchRecord={fetchRecord}
          showSuccessModal={showSuccessModal}
          setShowSuccessModal={setShowSuccessModal}
          setShowCreateFirstRecordModal={setShowCreateFirstRecordModal}
          onClose={() => setShowCreateFirstRecordModal(false)}
        />
      )}

      {/* Edit Record Modal */}
      {showEditRecordModal && (
        <EditRecordModal
          patientId={id}
          specialty={specialty}
          record={selectedRecord}
          fetchRecord={fetchRecord}
          setShowSuccessModal={setShowSuccessModal}
          onClose={() => setShowEditRecordModal(false)}
        />
      )}

      {/* Delete Record Modal */}
      {showDeleteModal && (
        <DeleteRecordModal
          recordToDelete={selectedRecord}
          setShowDeleteModal={setShowDeleteModal}
          handleDelete={async () => {
            await deleteClinicalRecord(selectedRecord?._id);
            await fetchRecord();
          }}
        />
      )}

      {/* Create Appointment Modal */}
      {showCreateAppointmentModal && (
        <DoctorCreateAppointmentModal
          currentPatientInfo={currentPatientInfo}
          onClose={() => setShowCreateAppointmentModal(false)}
        />
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          title={successTitle}
          message={successMessage}
          showSuccessModal={showSuccessModal}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}

      {/* Create Goal Modal */}
      {showCreateGoalModal && (
        <CreateGoalModal
          patient={patient}
          refetchGoals={refetchGoals}
          setSuccessTitle={setSuccessTitle}
          setSuccessMessage={setSuccessMessage}
          setShowSuccessModal={setShowSuccessModal}
          onClose={() => setShowCreateGoalModal(false)}
        />
      )}

      {/* History Card Feedback Modal */}
      {showHistoryCardFeedbackModal && (
        <DietEventsHistoryModal
          selectedHistoryCard={selectedHistoryCard}
          onClose={() => setShowHistoryCardFeedbackModal(false)}
        />
      )}

      {/* Workouts History Card Feedback Modal */}
      {showWorkoutHistoryCardFeedbackModal && (
        <WorkoutEventsHistoryModal
          selectedHistoryCard={selectedWorkoutHistoryCard}
          onClose={() => setShowWorkoutHistoryCardFeedbackModal(false)}
        />
      )}

      {/* Remove Diet Modal */}
      {showRemoveDietModal && (
        <RemoveDietModal
          patientId={id}
          refetchDiets={refetchDiets}
          dietToRemove={dietToDelete}
          clinicalRecordId={recordId}
          refetchTimeline={refetchTimeline}
          setSuccessTitle={setSuccessTitle}
          setSuccessMessage={setSuccessMessage}
          setShowSuccessModal={setShowSuccessModal}
          setShowRemoveDietModal={setShowRemoveDietModal}
        />
      )}

      {/* Remove Workout Modal */}
      {showRemoveWorkoutModal && (
        <RemoveWorkoutModal
          patientId={id}
          clinicalRecordId={recordId}
          refetchTimeline={refetchTimeline}
          workoutToRemove={workoutToRemove}
          setSuccessTitle={setSuccessTitle}
          setSuccessMessage={setSuccessMessage}
          refetchWorkouts={refetchPatientWorkouts}
          setShowSuccessModal={setShowSuccessModal}
          setShowRemoveWorkoutModal={setShowRemoveWorkoutModal}
        />
      )}

      {/* Edit Patient Modal */}
      {showEditPatientModal && (
        <EditPatientModal
          editUser={editUser}
          refetch={refetchUser}
          isPending={isPending}
          patient={patients.find((p) => p._id === selectedPatientId)}
          onClose={() => setShowEditPatientModal(false)}
        />
      )}
    </div>
  );
}
