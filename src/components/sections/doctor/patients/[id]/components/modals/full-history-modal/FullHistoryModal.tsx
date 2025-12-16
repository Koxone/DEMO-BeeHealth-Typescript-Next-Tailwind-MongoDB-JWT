'use client';

import { useState, useEffect } from 'react';
import { X, FileText } from 'lucide-react';

import ModalHeader from './components/ModalHeader';
import FullVersion from './components/FullVersion';

// Custom Hooks
import { useModalClose } from '@/hooks/useModalClose';
import { useGetPatientClinicalRecords } from '@/hooks/clinicalRecords/get/useGetPatientClinicalRecords';
import { useGetAllQuestions } from '@/hooks/clinicalRecords/get/useGetAllQuestions';
import { useEditClinicalRecord } from '@/hooks/clinicalRecords/edit/useEditClinicalRecord';

export default function FullHistoryModal({
  onClose,
  record,
  specialty,
  patientId,
  fetchRecord,
  setShowSuccessModal,
  setShowFullHistoryModal,
}) {
  // Is editing state
  const [isEditing, setIsEditing] = useState(false);

  // Close handler
  const { handleOverlayClick } = useModalClose(onClose);

  // Form data
  const [formData, setFormData] = useState({});

  // Hooks
  const { data: records, isLoading: recordsLoading } = useGetPatientClinicalRecords(patientId);
  const { questions } = useGetAllQuestions();
  const { isLoading: isUpdating, error, editClinicalRecord } = useEditClinicalRecord();

  // Get full record
  const fullRecord = records?.find((r) => r.version === 'full' && r.specialty === specialty);

  // Initialize form data with existing answers
  useEffect(() => {
    if (fullRecord?.answers) {
      const initialData = {};
      fullRecord.answers.forEach((answer) => {
        if (answer.question?.questionId) {
          initialData[answer.question.questionId] = answer.value;
        }
      });
      setFormData(initialData);
    }
  }, [fullRecord]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditing) {
      onClose();
      return;
    }

    try {
      // Prepare answers array
     const answers = Object.entries(formData).map(([questionId, value]) => {
  return {
    questionId: parseInt(questionId, 10),  // ← Envía el questionId numérico
    value,
  };
});

      // Call edit endpoint
      await editClinicalRecord(fullRecord._id, { answers });

      // Success actions
      setIsEditing(false);
      setShowFullHistoryModal(false);
      fetchRecord();
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 1000);
    } catch (err) {
      console.error('Error updating record:', err);
    }
  };

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
          title="Historia Clínica Completa"
          subtitle="Registro médico del paciente"
          onClose={onClose}
          icons={{ X, FileText }}
        />

        {/* Main content */}
        <form
          onSubmit={handleSubmit}
          className="max-h-[calc(90vh-180px)] overflow-y-auto px-6 py-8"
        >
          <FullVersion
            specialty={specialty}
            patientId={patientId}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            formData={formData}
            setFormData={setFormData}
          />

          {/* Action buttons when editing */}
          {isEditing && (
            <div className="mt-6 flex justify-end gap-3 border-t pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-xl bg-gray-300 px-6 py-2 font-semibold text-gray-700 transition hover:bg-gray-400"
                disabled={isUpdating}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                disabled={isUpdating}
              >
                {isUpdating ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
}
