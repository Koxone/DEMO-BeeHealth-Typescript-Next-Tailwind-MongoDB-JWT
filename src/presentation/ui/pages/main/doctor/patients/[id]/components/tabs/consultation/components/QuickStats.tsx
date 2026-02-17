// Next, React and Other Libraries
import { Activity, FileText, Ruler, Scale, TrendingUp, Weight } from 'lucide-react';

// Enums, Types and Interfaces
import { ConsultationDTOPresentation } from '@/presentation/types';
import { PatientClinicalStatsDTOPresentation, UserDTOPresentation } from '@/presentation/types/';

// Prop Types
interface QuickStatsProps {
  patientStats?: PatientClinicalStatsDTOPresentation;
  patientConsultations?: ConsultationDTOPresentation[];
}

export default function QuickStats({ patientStats, patientConsultations }: QuickStatsProps) {
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
              <p className="text-3xl font-bold text-(--med-text-dark)">
                {patientConsultations ? patientConsultations.length : '--'}
              </p>
              <p className="text-sm text-(--med-text-muted)">Consultas Totales</p>
            </div>
          </div>
          <TrendingUp className="text-beehealth-blue-primary-solid h-5 w-5" />
        </div>
      </div>

      {/* Current Weight */}
      <div className="bg-beehealth-body-main rounded-2xl border border-(--med-gray-border) p-6 shadow-sm transition hover:shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-beehealth-blue-primary-solid flex h-12 w-12 items-center justify-center rounded-xl">
              <Scale className="h-6 w-6 text-white" />
            </div>

            {/* Current Weight */}
            <div>
              <p className="text-3xl font-bold text-(--med-text-dark)">
                {patientConsultations.length > 0 && patientStats?.currentWeight
                  ? patientStats?.currentWeight
                  : '--'}
                <span className="text-lg"> kg</span>
              </p>
              <p className="text-sm text-(--med-text-muted)">Peso Actual (kg)</p>
            </div>
          </div>
          <Activity className="text-beehealth-blue-primary-solid h-5 w-5" />
        </div>
      </div>

      {/* Current Size */}
      <div className="bg-beehealth-body-main rounded-2xl border border-(--med-gray-border) p-6 shadow-sm transition hover:shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-beehealth-blue-primary-solid flex h-12 w-12 items-center justify-center rounded-xl">
              <Ruler className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-(--med-text-dark)">
                {patientConsultations.length > 0 && patientStats?.currentSize
                  ? patientStats?.currentSize
                  : '--'}
                <span className="text-lg"> cm</span>
              </p>
              <p className="text-sm text-(--med-text-muted)">Talla Actual (cm)</p>
            </div>
          </div>
          <Activity className="text-beehealth-blue-primary-solid h-5 w-5" />
        </div>
      </div>

      {/* Current Loose of Weight */}
      <div
        className={`${
          patientStats.weightLoss > 0
            ? 'bg-beehealth-green-secondary-light border-beehealth-green-secondary-dark'
            : patientStats.weightLoss === 0
              ? 'bg-beehealth-body-main border-neutral-300'
              : 'bg-beehealth-red-primary-light'
        } rounded-2xl border p-6 shadow-sm transition hover:shadow-md`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`${
                patientStats.weightLoss > 0
                  ? 'bg-beehealth-green-secondary-solid'
                  : patientStats.weightLoss === 0
                    ? 'bg-beehealth-blue-primary-solid'
                    : 'bg-beehealth-red-primary-light'
              } flex h-12 w-12 items-center justify-center rounded-xl`}
            >
              <Scale className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-(--med-text-dark)">
                {patientStats?.weightLoss && patientStats.weightLoss > 0
                  ? patientStats.weightLoss.toFixed(1)
                  : '--'}{' '}
                <span className="text-lg"> kg</span>
              </p>
              <p
                className={`${
                  patientStats.weightLoss > 0
                    ? 'text-beehealth-green-secondary-dark'
                    : patientStats.weightLoss === 0
                      ? 'text-(--med-text-muted)'
                      : 'text-beehealth-red-primary-solid'
                } text-sm`}
              >
                Peso perdido (kg)
              </p>
            </div>
          </div>
          <Weight
            className={`${
              patientStats.weightLoss > 0
                ? 'text-beehealth-green-secondary-dark'
                : patientStats.weightLoss === 0
                  ? 'text-beehealth-blue-primary-solid'
                  : 'text-beehealth-red-primary-solid'
            } text-sm`}
          />
        </div>
      </div>
    </div>
  );
}
