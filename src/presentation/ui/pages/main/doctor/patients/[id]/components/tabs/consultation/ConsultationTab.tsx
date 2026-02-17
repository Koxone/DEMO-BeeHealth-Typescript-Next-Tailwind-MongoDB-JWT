// UI Components
import { WeightChart, ConsultationsList, QuickStats } from './components/';

// Enums, Types and Interfaces
import {
  PatientClinicalStatsDTOPresentation,
  WeightClinicalSummaryDTOPresentation,
  ConsultationDTOPresentation,
  LatestConsultationResponseDTOPresentation,
  WeightHistoryPoint,
} from '@/presentation/types/';

// Modal Management
import { ConsultationModalManager } from './ConsultationModalManager';

// Prop Types
interface ConsultationTabProps {
  consultationsWithDietsAndWorkouts: ConsultationDTOPresentation[] | undefined;
  patientWeightHistory?: WeightHistoryPoint[];
  patientStats?: PatientClinicalStatsDTOPresentation;
  latestConsultation: LatestConsultationResponseDTOPresentation;
  patientWeightSummary?: WeightClinicalSummaryDTOPresentation;
}

export default function ConsultationTab({
  patientStats,
  latestConsultation,
  patientWeightSummary,
  patientWeightHistory,
  consultationsWithDietsAndWorkouts,
}: ConsultationTabProps) {

  return (
    <div className="flex flex-col gap-4">
      {/* Quick Stats */}
      <QuickStats
        patientStats={patientStats}
        patientConsultations={consultationsWithDietsAndWorkouts}
      />

      {/* Consults Tab */}
      <ConsultationsList
        latestConsultation={latestConsultation}
        consultationsWithDietsAndWorkouts={consultationsWithDietsAndWorkouts}
        patientWeightSummary={patientWeightSummary}
      />

      {/* Weight Chart */}
      <WeightChart
        patientWeightHistory={patientWeightHistory}
        patientWeightSummary={patientWeightSummary}
      />

      {/* Consultation Modal Management */}
      <ConsultationModalManager />
    </div>
  );
}
