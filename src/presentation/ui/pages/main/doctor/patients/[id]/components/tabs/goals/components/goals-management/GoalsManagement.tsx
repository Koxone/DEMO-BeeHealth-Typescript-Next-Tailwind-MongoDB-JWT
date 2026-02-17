// Next, React and Other Libraries
import { Flag } from 'lucide-react';
import { useSearchParams } from 'next/dist/client/components/navigation';

// UI Components
import ActiveGoalCard from './components/ActiveGoalCard';
import { ButtonSm } from '@/presentation/ui/pages/main/shared/buttons/Buttons';

// Feedback Components
import { EmptyState } from '@/presentation/ui/pages/main/shared/feedback';

// Enums, Types and Interfaces
import { GoalStatusEnum } from '@/domain/enums/';
import { GoalDTOPresentation } from '@/presentation/types/';

// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';
import { useGoToConsultasTab } from '@/presentation/hooks/shared/useGoToConsultasTab';

// Prop Types
interface GoalsManagementProps {
  goalsData: GoalDTOPresentation[];
}

export default function GoalsManagement({ goalsData }: GoalsManagementProps) {
  // Modal Management with Store
  const { openModal } = useActiveModalStore();

  // Get consultationId from URL
  const searchParams = useSearchParams();
  const consultationId = searchParams.get('consultationId');

  // Nav to Consultations Tab to select a consultation before managing goals
  const { goToConsultasTab } = useGoToConsultasTab();

  if (goalsData?.length === 0 || !consultationId) {
    const isMissingConsultation = !consultationId;

    return (
      <EmptyState
        title={isMissingConsultation ? 'Consulta no seleccionada' : 'No hay metas activas'}
        subtitle={
          isMissingConsultation
            ? 'Para gestionar las metas de este paciente, primero debes seleccionar una consulta activa.'
            : 'Este paciente aún no tiene metas. Crea una para comenzar el seguimiento.'
        }
      >
        {isMissingConsultation ? (
          <ButtonSm
            onClick={() => {
              goToConsultasTab();
            }}
            action="confirm"
          >
            Ir a Consultas
          </ButtonSm>
        ) : (
          <ButtonSm onClick={() => openModal('createGoal')} action="confirm">
            Crear Meta
          </ButtonSm>
        )}
      </EmptyState>
    );
  }

  return (
    <div className="space-y-6">
      {/* Assigned goals */}
      <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-4 shadow-sm">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-beehealth-blue-primary-solid rounded-xl p-2">
            <Flag className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-700">Metas Activas</p>
            <div className="flex items-center space-x-1">
              {!consultationId ? (
                <p className="text-sm text-gray-500">
                  Para poder gestionar metas, primero debe seleccionar una consulta
                </p>
              ) : (
                <p className="text-sm text-gray-500">Solo puede haber una meta activa a la vez.</p>
              )}
            </div>
          </div>
        </div>

        {/* Diet Card */}
        <div className="grid grid-cols-2 gap-4">
          {goalsData
            ?.filter((goal) => goal?.status === GoalStatusEnum.ACTIVE)
            .map((goal) => (
              <ActiveGoalCard key={goal?.id} goal={goal} />
            ))}
        </div>
      </div>
    </div>
  );
}
