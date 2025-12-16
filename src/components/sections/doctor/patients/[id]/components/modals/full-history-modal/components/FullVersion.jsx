import LoadingState from '@/components/shared/feedback/LoadingState';
import { CalendarIcon } from 'lucide-react';
import ToggleEditModeButton from './ToggleEditModeButton';

// Custom Hooks
import { useGetAllQuestions } from '@/hooks/clinicalRecords/get/useGetAllQuestions';
import { useGetPatientClinicalRecords } from '@/hooks/clinicalRecords/get/useGetPatientClinicalRecords';

export default function FullVersion({
  specialty,
  patientId,
  isEditing,
  setIsEditing,
  formData,
  setFormData,
}) {
  // Fetch patient records
  const { data: records, isLoading: recordsLoading } = useGetPatientClinicalRecords(patientId);

  // Get the full version record
  const fullRecord = records?.find((r) => r.version === 'full' && r.specialty === specialty);

  // Fetch Questions to render UI
  const { questions, loading: questionsLoading } = useGetAllQuestions();
  const filtered = questions?.filter((q) => q.version === 'full' && q.specialty === specialty);

  // Loading State
  if (recordsLoading || questionsLoading) {
    return <LoadingState />;
  }

  if (!fullRecord) {
    return <div className="text-center text-gray-500">No hay registro completo disponible</div>;
  }

  // Handle input change
  const handleInputChange = (questionId, value) => {
    setFormData((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <CalendarIcon className="h-5 w-5 text-blue-600" />
            Información Completa
          </h3>

          {isEditing ? (
            <span className="bg-beehealth-red-primary-solid mb-4 w-fit rounded-lg p-1 text-xs text-white">
              Modo Edición
            </span>
          ) : (
            <span className="bg-beehealth-green-secondary-solid mb-4 w-fit rounded-lg p-1 text-xs text-white">
              Solo Lectura
            </span>
          )}
        </div>

        <ToggleEditModeButton isEditing={isEditing} setIsEditing={setIsEditing} />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered?.map((q) => {
          const answer = fullRecord.answers?.find((a) => a.question?._id === q._id);
          const currentValue =
            formData[q.questionId] !== undefined ? formData[q.questionId] : answer?.value || '';

          return (
            <div key={q?._id}>
              <label className="mb-2 block text-sm font-semibold text-gray-700">{q?.text}</label>

              {q?.type === 'textarea' ? (
                <textarea
                  rows={3}
                  value={currentValue}
                  readOnly={!isEditing}
                  disabled={!isEditing}
                  onChange={(e) => handleInputChange(q.questionId, e.target.value)}
                  className={`w-full resize-none rounded-xl border-2 px-4 py-3 outline-none ${
                    isEditing
                      ? 'border-blue-300 bg-white text-gray-900 focus:border-blue-500'
                      : 'bg-beehealth-body-main border-gray-300 text-gray-500'
                  }`}
                />
              ) : q?.type === 'select' ? (
                <select
                  value={currentValue}
                  disabled={!isEditing}
                  onChange={(e) => handleInputChange(q.questionId, e.target.value)}
                  className={`w-full rounded-xl border-2 px-4 py-3 outline-none ${
                    isEditing
                      ? 'border-blue-300 bg-white text-gray-900 focus:border-blue-500'
                      : 'bg-beehealth-body-main border-gray-300 text-gray-500'
                  }`}
                >
                  <option value="">Seleccionar</option>
                  {q?.options?.map((opt) => (
                    <option key={opt._id} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : q?.type === 'radio' ? (
                <div className="flex gap-4">
                  {q?.options?.map((opt) => (
                    <label key={opt._id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={q.questionId}
                        value={opt.value}
                        checked={currentValue === opt.value}
                        disabled={!isEditing}
                        onChange={(e) => handleInputChange(q.questionId, e.target.value)}
                        className="h-4 w-4"
                      />
                      <span className="text-sm text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              ) : q?.type === 'checkbox' ? (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={currentValue === 'true' || currentValue === true}
                    disabled={!isEditing}
                    onChange={(e) => handleInputChange(q.questionId, e.target.checked.toString())}
                    className="h-4 w-4"
                  />
                  <span className="text-sm text-gray-700">{q?.text}</span>
                </div>
              ) : (
                <input
                  type={q?.type}
                  value={currentValue}
                  readOnly={!isEditing}
                  disabled={!isEditing}
                  onChange={(e) => handleInputChange(q.questionId, e.target.value)}
                  className={`w-full rounded-xl border-2 px-4 py-3 outline-none ${
                    isEditing
                      ? 'border-blue-300 bg-white text-gray-900 focus:border-blue-500'
                      : 'bg-beehealth-body-main border-gray-300 text-gray-500'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
