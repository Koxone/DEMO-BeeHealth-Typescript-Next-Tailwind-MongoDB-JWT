import LoadingState from '@/components/shared/feedback/LoadingState';
import { useGetAllQuestions } from '@/hooks/clinicalRecords/get/useGetAllQuestions';
import { useGetPatientClinicalRecords } from '@/hooks/clinicalRecords/get/useGetPatientClinicalRecords';
import { CalendarIcon } from 'lucide-react';

export default function FullVersion({
  specialty,
  isReadOnly = true,
  patientId,
  formData,
  setFormData,
}) {
  // Fetch patient records
  const { data: records, loading: recordsLoading } = useGetPatientClinicalRecords(patientId);

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

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <CalendarIcon className="h-5 w-5 text-blue-600" />
          Información Completa
        </h3>

        <span className="bg-beehealth-green-secondary-light text-beehealth-green-secondary-dark mb-4 w-fit rounded-lg p-1 text-xs">
          Solo Lectura
        </span>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered?.map((q) => {
          const answer = fullRecord.answers?.find((a) => a.question?._id === q._id);
          const value = answer?.value || '';

          return (
            <div key={q?._id}>
              <label className="mb-2 block text-sm font-semibold text-gray-700">{q?.text}</label>

              {q?.type === 'textarea' ? (
                <textarea
                  rows={3}
                  value={value}
                  readOnly
                  disabled
                  className="focus:bg-beehealth-body-main bg-beehealth-body-main w-full resize-none rounded-xl border-2 border-gray-300 px-4 py-3 text-gray-500 outline-none"
                />
              ) : q?.type === 'select' ? (
                <select
                  value={value}
                  disabled
                  className="focus:bg-beehealth-body-main bg-beehealth-body-main w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-gray-500 outline-none"
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
                        checked={value === opt.value}
                        disabled
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
                    checked={value === 'true' || value === true}
                    disabled
                    className="h-4 w-4"
                  />
                  <span className="text-sm text-gray-700">{q?.text}</span>
                </div>
              ) : (
                <input
                  type={q?.type}
                  value={value}
                  readOnly
                  disabled
                  className="focus:bg-beehealth-body-main bg-beehealth-body-main w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-gray-500 outline-none"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
