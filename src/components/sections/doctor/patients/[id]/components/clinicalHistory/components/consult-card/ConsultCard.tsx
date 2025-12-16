import { Apple, Dumbbell, Edit2, Eye, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import EditRecordDateButton from './components/EditRecordDateButton';

// Local Helpers
import { getActionBadge } from './services/helpers';

// Custom Hooks
import { useEditClinicalRecord } from '@/hooks/clinicalRecords/edit/useEditClinicalRecord';

function ConsultCard({
  r,
  onEdit,
  questions,
  specialty,
  fetchRecord,
  onDelete,
  patientRecord,
  patientId,
  events,
}) {
  function getValueByQuestionId(questionId) {
    if (!r?.answers) return null;
    let answersArray = [];
    if (Array.isArray(r.answers)) {
      answersArray = r.answers;
    } else if (typeof r.answers === 'object') {
      answersArray = Object.values(r.answers);
    }
    const ans = answersArray.find((a) => a?.question?.questionId === questionId);
    return ans ? ans.value : null;
  }
  // Fetch all questions from the custom hook
  const filtered = questions?.filter((q) => q?.version === 'quick' && q?.specialty === specialty);

  const DISEASE_QUESTION_IDS = [
    27, 28, 29, 30, 31, 32, 39, 40, 41, 79, 81, 82, 87, 88, 89, 92, 93, 94, 95, 96,
  ];

  // 38 quick, 49 quick, 89 short y quick, 91 short y quick, 94 short, 95 short, 115 quick, 122 123 124 126 short

  const { editClinicalRecord } = useEditClinicalRecord();

  const firstRecord = patientRecord?.find((record) => record.version === 'full');
  const diseasesFromFirstRecord = firstRecord
    ? firstRecord.answers
        ?.filter(
          (answer) =>
            answer.question?.type === 'radio' &&
            answer.value === 'true' &&
            DISEASE_QUESTION_IDS.includes(answer.question.questionId)
        )
        .map((answer) => answer.question.text)
    : [];

  const recordId = r._id;

  const filteredDietsEvents = events?.filter(
    (event) => event.clinicalRecord === recordId && event.eventType.includes('diet')
  );

  const filteredWorkoutsEvents = events?.filter(
    (event) => event.clinicalRecord === recordId && event.eventType.includes('workout')
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-4">
      {/* Date block */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="bg-beehealth-blue-primary-light text-beehealth-blue-primary-dark border-beehealth-blue-primary-solid flex h-12 w-12 flex-col items-center justify-center rounded-lg border sm:h-14 sm:w-14">
          <span className="text-xs font-medium uppercase">
            {new Date(`${r.recordDate.substring(0, 7)}-15T12:00:00Z`).toLocaleDateString('es-MX', {
              month: 'short',
            })}
          </span>
          <span className="text-base font-bold sm:text-lg">{r.recordDate.substring(8, 10)}</span>
        </div>

        {/* First record badge */}
        {r?.version === 'full' && (
          <span className="text-beehealth-blue-primary-solid text-xs font-semibold">
            Primera Vez
          </span>
        )}

        {/* Edit Date Button */}
        <EditRecordDateButton
          fetchRecord={fetchRecord}
          onSelect={(formattedDate) => {
            editClinicalRecord(r._id, { recordDate: formattedDate });
          }}
        />
      </div>

      {/* Info cards */}
      <div className="grid w-full grid-cols-4 grid-rows-2 items-center justify-center gap-2">
        {filtered?.map((element) => {
          const value = getValueByQuestionId(element.questionId);

          const bgClass =
            element.questionId === 818 || element.questionId === 826
              ? 'bg-beehealth-red-primary-light'
              : 'bg-beehealth-green-secondary-light';

          return (
            <div key={element._id} className={`${bgClass} h-full rounded-lg p-2`}>
              <div className="text-beehealth-green-primary-solid flex items-center gap-1.5 text-xs font-medium sm:gap-2">
                <span className="truncate">{element.text}</span>
              </div>
              <p className="line-clamp-2 text-sm font-medium text-gray-900">{value}</p>
            </div>
          );
        })}

        {/* Diseases in this consult */}
        {diseasesFromFirstRecord.map((disease, index) => (
          <div key={index} className="bg-beehealth-red-primary-light h-full rounded-lg p-2">
            <div className="text-beehealth-red-primary-solid flex items-center gap-1.5 text-xs font-medium sm:gap-2">
              <span className="truncate">Diagnóstico Positivo</span>
            </div>
            <p className="text-sm font-medium text-gray-900">{disease}</p>
          </div>
        ))}

        {/* Diets on this consult */}
        {filteredDietsEvents?.map((event, index) => {
          const badge = getActionBadge(event?.eventType);
          const BadgeIcon = badge.icon;

          return (
            <Link
              key={index}
              href={`/doctor/diets/${event?.diet?._id}` || '#'}
              className={`${badge.className} h-full cursor-pointer rounded-lg border p-2 transition-all hover:scale-105`}
            >
              <div className="flex items-center justify-between">
                <div className="text-beehealth-green-primary-solid flex items-center gap-1.5 text-xs font-medium sm:gap-2">
                  <span className="truncate text-white underline">{badge?.label}</span>
                </div>

                <BadgeIcon className="h-5 w-5 text-white" />
              </div>

              <p className="text-sm font-medium text-gray-900">{event?.diet?.name || 'Ninguna'}</p>
            </Link>
          );
        })}

        {/* Workouts on this consult */}
        {filteredWorkoutsEvents?.map((event, index) => {
          const badge = getActionBadge(event?.eventType);
          const BadgeIcon = badge.icon;

          return (
            <Link
              key={index}
              href="/doctor/workouts/"
              className={`${badge.className} h-full cursor-pointer rounded-lg border p-2 transition-all hover:scale-105`}
            >
              <div className="flex items-center justify-between">
                <div className="text-beehealth-green-primary-solid flex items-center gap-1.5 text-xs font-medium sm:gap-2">
                  <span className="truncate text-white underline">{badge?.label}</span>
                </div>

                <BadgeIcon className="h-5 w-5 text-white" />
              </div>

              <p className="text-sm font-medium text-gray-900">
                {event?.snapshot?.workoutName || 'Ninguna'}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(r, true)}
          className="hover:bg-beehealth-green-secondary-dark-hover bg-beehealth-green-secondary-dark self-start rounded-lg p-2 text-white hover:text-white active:scale-95 sm:self-auto sm:p-2.5"
        >
          <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        <div className="flex flex-col justify-between">
          {/* Add Diets Button */}
          {r?.version === 'short' && (
            <Link
              href={`/doctor/patients/${patientId}?tab=Dietas&recordId=${recordId}`}
              title="Agregar Dieta a esta consulta"
              className="hover:bg-beehealth-blue-primary-dark-hover bg-beehealth-blue-primary-dark flex items-center self-start rounded-lg p-2 text-white active:scale-95 sm:self-auto sm:p-2.5"
            >
              <Plus className="h-4 w-4" />
              <Apple className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          )}

          {/* Add Workouts Button */}
          {r?.version === 'short' && (
            <Link
              href={`/doctor/patients/${patientId}?tab=Ejercicios&recordId=${recordId}`}
              title="Agregar Ejercicio a esta consulta"
              className="hover:bg-beehealth-blue-primary-dark-hover bg-beehealth-blue-primary-dark flex items-center self-start rounded-lg p-2 text-white active:scale-95 sm:self-auto sm:p-2.5"
            >
              <Plus className="h-4 w-4" />
              <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          )}

          {/* Edit Record Button */}
          {r?.version === 'short' && (
            <button
              onClick={() => onEdit(r, false)}
              className="hover:bg-beehealth-yellow-secondary-solid-hover bg-beehealth-yellow-secondary-solid flex items-center justify-center self-start rounded-lg p-2 text-white active:scale-95 sm:self-auto sm:p-2.5"
            >
              <Edit2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          )}

          {/* Delete Record Button */}
          {r?.version === 'short' && (
            <button
              onClick={() => onDelete(r)}
              className="hover:bg-beehealth-red-primary-solid-hover bg-beehealth-red-primary-solid flex justify-center self-start rounded-lg p-2 text-white active:scale-95 sm:self-auto sm:p-2.5"
            >
              <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConsultCard;
