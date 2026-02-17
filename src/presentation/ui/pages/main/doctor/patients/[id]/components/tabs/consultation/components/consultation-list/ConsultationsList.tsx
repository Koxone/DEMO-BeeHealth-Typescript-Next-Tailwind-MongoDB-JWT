'use client';

// Next, React and Other Libraries
import { Plus, ClipboardList, Settings } from 'lucide-react';
import { useParams } from 'next/dist/client/components/navigation';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// UI Components
import ConsultationCard from './components/consultation-card/ConsultationCard';
import { ButtonSm } from '@/presentation/ui/pages/main/shared/buttons/Buttons';
import NoConsultationsState from './components/NoConsultationsState';
import PaginationButtons from './components/PaginationButtons';

// Enums, Types and Interfaces
import {
  WeightClinicalSummaryDTOPresentation,
  ConsultationDTOPresentation,
  LatestConsultationResponseDTOPresentation,
} from '@/presentation/types/';

// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

// Props Types
interface ConsultationsListProps {
  latestConsultation: LatestConsultationResponseDTOPresentation;
  patientWeightSummary?: WeightClinicalSummaryDTOPresentation;
  consultationsWithDietsAndWorkouts?: ConsultationDTOPresentation[];
}

export default function ConsultationsList({
  patientWeightSummary,
  consultationsWithDietsAndWorkouts,
  latestConsultation,
}: ConsultationsListProps) {
  // Patient ID from URL Params
  const searchParams = useSearchParams();

  const { id: patientId } = useParams<{ id: string }>();

  // Modal Management with Store
  const { openModal } = useActiveModalStore();

  useEffect(() => {
    const scrollTo = searchParams.get('scrollTo');
    if (scrollTo !== 'assignDietPlanButton') return;

    const el = document.getElementById('assignDietPlanButton');
    if (!el) return;

    const timeout = setTimeout(() => {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [searchParams]);

  return (
    <div id="assignDietPlanButton">
      <div className="bg-beehealth-body-main rounded-2xl border border-(--med-gray-border) p-4 shadow-sm sm:p-6">
        {/* Header */}
        <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-beehealth-blue-primary-solid flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12">
              <ClipboardList className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-(--med-text-dark) sm:text-xl">
                Historial de Consultas para este paciente
              </h2>
              <p className="text-xs text-(--med-text-muted) sm:text-sm">
                Registros médicos del paciente
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <ButtonSm action="edit" disabled={patientWeightSummary === undefined}>
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Configurar vista</span>
            </ButtonSm>

            {/* Create Consultation Button */}
            <ButtonSm
              action="confirm"
              onClick={() => openModal('createConsultation', { patientId, latestConsultation })}
              disabled={patientWeightSummary === undefined}
            >
              <Plus className="h-4 w-4" />
              Registrar Consulta
            </ButtonSm>
          </div>
        </div>

        {/* Consultations */}
        <div className="space-y-3 sm:space-y-4">
          {/* Consultations Card */}
          {consultationsWithDietsAndWorkouts?.length > 0 ? (
            consultationsWithDietsAndWorkouts?.map((consultation) => (
              <ConsultationCard key={consultation.id} consultation={consultation} />
            ))
          ) : (
            <NoConsultationsState />
          )}

          {/* Pagination */}
          {consultationsWithDietsAndWorkouts?.length > 4 && (
            <PaginationButtons
              onClickPrev={() => {}}
              onClickNext={() => {}}
              currentPage={1}
              totalPages={1}
            />
          )}
        </div>
      </div>
    </div>
  );
}
