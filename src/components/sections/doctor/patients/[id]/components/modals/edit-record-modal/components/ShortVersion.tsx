import LoadingState from '@/components/shared/feedback/LoadingState';
import { useGetAllQuestions } from '@/@hooks/clinicalRecords/get/useGetAllQuestions';
import { CalendarIcon } from 'lucide-react';
import AssignSection from './assign-section/AssignSection';
import FooterActions from './FooterActions';

export default function ShortVersion({
  specialty,
  formData,
  setFormData,
  onClose,
  isSubmitting = false,
  setDietSelected,
  setWorkoutSelected,
  patientId,
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
      {/* <div>
        <AssignSection
          patientId={patientId}
          onSelectDiet={(dietId) => {
            setDietSelected(dietId);
          }}
          onSelectWorkout={(workoutId) => {
            setWorkoutSelected(workoutId);
          }}
        />
      </div> */}

      <div className="flex flex-col gap-1">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-700">
          <CalendarIcon className="h-5 w-5 text-blue-600" />
          Información Básica
        </h3>

        <span className="bg-beehealth-red-primary-light text-beehealth-red-primary-dark mb-4 w-fit rounded-lg p-1 text-xs">
          Modo Edición
        </span>
      </div>

      {/* Main Content */}
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
                placeholder=""
                className="focus:bg-beehealth-body-main bg-beehealth-body-main w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 transition outline-none focus:border-blue-400"
              />
            ) : (
              <input
                type={q?.type || 'text'}
                value={formData[q.questionId] || ''}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [q.questionId]: e.target.value }))
                }
                className="focus:bg-beehealth-body-main bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition outline-none focus:border-blue-400"
              />
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <FooterActions onCancel={onClose} submitLabel="Guardar cambios" isSubmitting={isSubmitting} />
    </div>
  );
}
