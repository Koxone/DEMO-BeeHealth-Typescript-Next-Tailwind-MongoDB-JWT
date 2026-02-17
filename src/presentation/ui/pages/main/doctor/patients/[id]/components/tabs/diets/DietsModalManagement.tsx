// Next, React and Other Libraries
import { useSearchParams } from 'next/dist/client/components/navigation';

// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

// Feedback Components
import {
  TimelineEventModal,
  CancelDietPlanModal,
  CompleteDietPlanModal,
  RenewDietPlanModal,
  SharedModalManagement,
} from './components';

// Enums, Types and Interfaces
import { DietActiveModalConstant } from '@/presentation/constants/diet';
import { DietPlanResponseDTOPresentation } from '@/presentation/types/diet-plan-types';

export const DietsModalManagement: React.FC = () => {
  // Next, React and Other Libraries
  const searchParams = useSearchParams();

  // Get Consultation ID from URL Search Params
  const consultationId = searchParams.get('consultationId');

  // Modal Handler
  const { activeModal, data } = useActiveModalStore();

  if (!activeModal) return null;

  const dietModals: DietActiveModalConstant[] = [
    'dietComplete',
    'dietRenew',
    'dietCancel',
    'dietEvent',
  ];

  const isDietsModal =
    dietModals.includes(activeModal as DietActiveModalConstant) || activeModal === 'success';

  if (!isDietsModal) return null;

  return (
    <>
      {/* Modal para Crear Consulta */}
      {activeModal === 'dietEvent' && <TimelineEventModal selectedTimelineEventCard={data} />}

      {/* Complete Diet Plan Modal */}
      {activeModal === 'dietComplete' && (
        <CompleteDietPlanModal selectedDiet={data as DietPlanResponseDTOPresentation} />
      )}

      {/* Renew Diet Plan Modal */}
      {activeModal === 'dietRenew' && (
        <RenewDietPlanModal
          consultationId={consultationId}
          selectedDiet={data as DietPlanResponseDTOPresentation}
        />
      )}

      {/* Cancel Diet Plan Modal */}
      {activeModal === 'dietCancel' && (
        <CancelDietPlanModal selectedDiet={data as DietPlanResponseDTOPresentation} />
      )}

      {/* Success Modal */}
      {activeModal === 'success' && <SharedModalManagement />}
    </>
  );
};
