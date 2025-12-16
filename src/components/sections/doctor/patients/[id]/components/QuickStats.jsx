import { useGetPatientWeightLogs } from '@/hooks/clinicalRecords/get/useGetPatientWeightLogs';
import {
  Activity,
  DollarSign,
  FileText,
  Heart,
  Ruler,
  Scale,
  TrendingUp,
  Weight,
} from 'lucide-react';

export default function QuickStats({ patientRecord, specialty, patientId }) {
  // Helper function
  function getValueByQuestionId(questionId) {
    const record = patientRecord?.[0];
    if (!record?.answers) return null;

    // Handle both object and array formats
    let answersArray = [];
    if (Array.isArray(record.answers)) {
      answersArray = record.answers;
    } else if (typeof record.answers === 'object') {
      answersArray = Object.values(record.answers);
    }

    const answer = answersArray.find((a) => a?.question?.questionId === questionId);
    return answer ? answer.value : null;
  }

  const {
    weightLogs,
    loading: weightLogsLoading,
    error: weightLogsError,
    refetch: refetchWeightLogs,
  } = useGetPatientWeightLogs(patientId);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
      {/* Consultas Totales */}
      <div className="bg-beehealth-body-main rounded-2xl border border-(--med-gray-border) p-6 shadow-sm transition hover:shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-beehealth-blue-primary-solid flex h-12 w-12 items-center justify-center rounded-xl">
              <FileText className="h-6 w-6 text-white" />
            </div>

            {/* Total Consults */}
            <div>
              <p className="text-3xl font-bold text-(--med-text-dark)">{patientRecord?.length}</p>
              <p className="text-sm text-(--med-text-muted)">Consultas Totales</p>
            </div>
          </div>
          <TrendingUp className="h-5 w-5 text-(--med-green)" />
        </div>
      </div>

      {/* Current Weight */}
      {specialty === 'weight' && (
        <div className="bg-beehealth-body-main rounded-2xl border border-(--med-gray-border) p-6 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-beehealth-blue-primary-solid flex h-12 w-12 items-center justify-center rounded-xl">
                <Scale className="h-6 w-6 text-white" />
              </div>

              {/* Current Weight */}
              <div>
                <p className="text-3xl font-bold text-(--med-text-dark)">
                  {getValueByQuestionId(7) || 0}
                  <span className="text-lg">kg</span>
                </p>
                <p className="text-sm text-(--med-text-muted)">Peso Actual (kg)</p>
              </div>
            </div>
            <Activity className="text-beehealth-blue-primary-solid h-5 w-5" />
          </div>
        </div>
      )}

      {/* Patients Debts */}
      {/* {specialty === 'dental' && (
        <div className="bg-beehealth-body-main rounded-2xl border border-(--med-gray-border) p-6 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--med-blue-light)">
                <DollarSign className="h-6 w-6 text-(--med-blue)" />
              </div>
              <div>
                <p className="text-3xl font-bold text-(--med-text-dark)">${getAnswer(161)}</p>
                <p className="text-sm text-(--med-text-muted)">Adeudos</p>
              </div>
            </div>
            <Activity className="text-beehealth-blue-primary-solid h-5 w-5" />
          </div>
        </div>
      )} */}

      {/* Current Size */}
      <div className="bg-beehealth-body-main rounded-2xl border border-(--med-gray-border) p-6 shadow-sm transition hover:shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-beehealth-blue-primary-solid flex h-12 w-12 items-center justify-center rounded-xl">
              <Ruler className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-(--med-text-dark)">
                {getValueByQuestionId(8) || 0}
                <span className="text-lg">cm</span>
              </p>
              <p className="text-sm text-(--med-text-muted)">Talla Actual (cm)</p>
            </div>
          </div>
          <Activity className="text-beehealth-blue-primary-solid h-5 w-5" />
        </div>
      </div>

      {/* Current Size */}
      <div className="bg-beehealth-red-primary-light border-beehealth-red-primary-solid rounded-2xl border p-6 shadow-sm transition hover:shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-beehealth-red-primary-solid flex h-12 w-12 items-center justify-center rounded-xl">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-(--med-text-dark)">
                {(weightLogs[0]?.differenceFromOriginal.toFixed(2)) || 0}
                <span className="text-lg">kg</span>
              </p>
              <p className="text-beehealth-red-primary-dark text-sm">Peso perdido (kg)</p>
            </div>
          </div>
          <Weight className="text-beehealth-red-primary-solid h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
