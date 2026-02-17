// UI Components
import { SharedModalManagement } from '../diets/components';

// Feedback Components
import { CreateGoalModal, ManageGoalModal } from './components/modals';

// Enums, Types and Interfaces
import { UserDTOPresentation } from '@/presentation/types/user.types';

// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

// Prop types
type GoalsTabModalManagerProps = {
  patientUserData: UserDTOPresentation;
};

export const GoalsTabModalManager: React.FC<GoalsTabModalManagerProps> = ({ patientUserData }) => {
  // Modal Handler
  const { activeModal, data, closeModal } = useActiveModalStore();

  if (!activeModal) return null;

  const isGoalsModal =
    activeModal === 'createGoal' ||
    activeModal === 'manageGoal' ||
    activeModal === 'cancelGoal' ||
    activeModal === 'success';

  if (!isGoalsModal) return null;

  return (
    <>
      {/* Modal para Crear Meta */}
      {activeModal === 'createGoal' && <CreateGoalModal patientUserData={patientUserData} />}

      {/* Modal para Cancelar Meta */}
      {activeModal === 'manageGoal' && <ManageGoalModal />}

      {/* Success Modal */}
      {activeModal === 'success' && <SharedModalManagement />}
    </>
  );
};
