import LoadingState from '@/components/shared/feedback/LoadingState';
import { CalendarIcon } from 'lucide-react';
import AssignSection from './assign-section/AssignSection';
import FooterActions from './FooterActions';

// Custom Hooks
import { useGetAllQuestions } from '@/hooks/clinicalRecords/get/useGetAllQuestions';

export default function ShortVersion({
  specialty,
  isReadOnly = true,
  formData,
  setFormData,
  activeTab,
  onClose,
  isSubmitting,
  isCreate,
  dietSelected,
  setDietSelected,
  workoutSelected,
  setWorkoutSelected,
  patientId,
  setShowSuccessModal,
  refetchTimeline,
}) {
  // Fetch questions
  const { questions, loading } = useGetAllQuestions();
  const filtered = questions?.filter((q) => q.version === 'short' && q.specialty === specialty);

  // Loading state
  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-4">
      {/* Assign Diet or Workout Section */}
      {/* <div className="px">
        <AssignSection
          patientId={patientId}
          refetchTimeline={refetchTimeline}
          setShowSuccessModal={setShowSuccessModal}
          onSelectDiet={(dietId) => {
            setDietSelected(dietId);
          }}
          onSelectWorkout={(workoutId) => {
            setWorkoutSelected(workoutId);
          }}
        />
      </div> */}

      <div className="flex flex-col gap-1">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <CalendarIcon className="h-5 w-5 text-blue-600" />
          Información Básica
        </h3>

        <span
          className={`mb-4 w-fit rounded-lg ${
            isReadOnly
              ? 'bg-beehealth-green-secondary-light text-beehealth-green-secondary-dark'
              : 'bg-beehealth-red-primary-light text-beehealth-red-primary-dark'
          } p-1 text-xs`}
        >
          {isReadOnly ? 'Solo Lectura' : 'Modo Edicion'}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered?.map((q) => (
          <div key={q?._id}>
            {/* Label */}
            <label className="mb-2 block text-sm font-semibold text-gray-700">{q?.text}</label>

            {/* Input or Textarea */}
            {q?.type === 'textarea' ? (
              <textarea
                rows={3}
                value={formData[q.questionId] || ''}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [q.questionId]: e.target.value }))
                }
                readOnly={isReadOnly}
                disabled={isReadOnly}
                placeholder=""
                className={`focus:bg-beehealth-body-main bg-beehealth-body-main w-full resize-none rounded-xl border-2 px-4 py-3 transition outline-none ${
                  isReadOnly ? 'border-gray-300 bg-gray-100 text-gray-500' : 'border-gray-200'
                }`}
              />
            ) : (
              <input
                type={q?.type}
                value={formData[q.questionId] || ''}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [q.questionId]: e.target.value }))
                }
                readOnly={isReadOnly}
                disabled={isReadOnly}
                placeholder=""
                className={`focus:bg-beehealth-body-main bg-beehealth-body-main w-full rounded-xl border-2 px-4 py-3 transition outline-none ${
                  isReadOnly ? 'border-gray-300 bg-gray-100 text-gray-500' : 'border-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {!isReadOnly && activeTab === 'basico' && (
        <FooterActions
          onCancel={onClose}
          submitLabel={isCreate ? 'Guardar nuevo registro' : 'Guardar cambios'}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
