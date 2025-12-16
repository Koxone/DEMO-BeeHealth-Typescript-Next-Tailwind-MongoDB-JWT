'use client';

import { useState, useEffect } from 'react';
import { X, FileText } from 'lucide-react';

import ModalHeader from './components/ModalHeader';
import ShortVersion from './components/ShortVersion';

// Feedback Components
import LoadingState from '@/components/shared/feedback/LoadingState';

// Custom Hooks
import { useModalClose } from '@/hooks/useModalClose';
import { useEditWorkout } from '@/hooks/workouts/edit/useEditWorkout';
import { useAssignPatientToDiet } from '@/hooks/diets/assign/useAssignPatientToDiet';
import { useEditClinicalRecord } from '@/hooks/clinicalRecords/edit/useEditClinicalRecord';

export default function EditRecordModal({
  onClose,
  record,
  specialty,
  patientId,
  setShowSuccessModal,
  fetchRecord,
}) {
  // Record ID
  const recordId = record?._id;

  // Edit Clinical Record Custom Hook State
  const { isLoading, error, editClinicalRecord } = useEditClinicalRecord();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Diet state
  const [dietSelected, setDietSelected] = useState(null);
  const { editPatients } = useAssignPatientToDiet();

  // Workout state
  const [workoutSelected, setWorkoutSelected] = useState(null);
  const { editWorkout } = useEditWorkout();

  // Close Modal handler
  const { handleOverlayClick } = useModalClose(onClose);

  // Form data - stores questionId -> value pairs
  const [formData, setFormData] = useState({});

  // Populate form data with existing record answers
  useEffect(() => {
    if (record?.answers) {
      const initial = {};
      record.answers.forEach((ans) => {
        const qId = ans.question?.questionId || ans.questionId;
        if (qId !== undefined) {
          initial[qId] = ans.value || '';
        }
      });
      setFormData(initial);
    }
  }, [record]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Build answers array from formData
      const answers = Object.entries(formData).map(([questionId, value]) => ({
        questionId: Number(questionId),
        value: value,
      }));

      // Update clinical record
      await editClinicalRecord(recordId, { answers });

      // Assign diet if selected
      if (dietSelected) {
        await editPatients(dietSelected, [patientId]);
      }

      // Assign workout if selected
      if (workoutSelected) {
        await editWorkout(workoutSelected, { patients: [patientId] });
      }

      // Success callback
      fetchRecord();
      setShowSuccessModal(true);
      onClose();
      setTimeout(() => {
        setShowSuccessModal(false);
        setIsSubmitting(false);
      }, 1200);
    } catch (err) {
      console.error('Error updating record:', err);
    } finally {
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div
        className="bg-beehealth-body-main relative w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader
          title="Editar Historial Clínico"
          subtitle="Edita los campos que sean necesarios"
          onClose={onClose}
          icons={{ X, FileText }}
        />

        {/* Error display */}
        {error && (
          <div className="mx-6 mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">{error}</div>
        )}

        {/* Main content */}
        <form
          onSubmit={handleSubmit}
          className="max-h-[calc(90vh-180px)] overflow-y-auto px-6 py-8"
        >
          <ShortVersion
            patientId={patientId}
            specialty={specialty}
            formData={formData}
            setFormData={setFormData}
            isSubmitting={isSubmitting}
            onClose={onClose}
            setDietSelected={setDietSelected}
            setWorkoutSelected={setWorkoutSelected}
          />
        </form>
      </div>
    </div>
  );
}
