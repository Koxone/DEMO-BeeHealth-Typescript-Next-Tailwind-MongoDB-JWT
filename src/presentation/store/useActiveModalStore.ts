import { create } from 'zustand';
import { WorkoutActiveModalConstant, DietActiveModalConstant } from '../constants/';
import { WorkoutPlanModalConstant } from '../constants/workout-plan/workout-plan.constant';

type DietModal = DietActiveModalConstant;
type WorkoutModal = WorkoutActiveModalConstant;
type SharedModal = 'success' | 'error' | 'confirm';
type ConsultationModal = 'createConsultation' | 'viewConsultation';
type GoalModal = 'createGoal' | 'manageGoal' | 'cancelGoal';
type ClinicalHistory = 'viewClinicalHistory' | 'createClinicalHistory';
type WorkoutPlan = WorkoutPlanModalConstant;

export type ActiveModalType =
  | DietModal
  | WorkoutModal
  | SharedModal
  | ConsultationModal
  | GoalModal
  | ClinicalHistory
  | WorkoutPlan
  | null;

interface ModalState {
  activeModal: ActiveModalType;
  data: any;

  // Acciones
  openModal: (type: ActiveModalType, data?: any) => void;
  closeModal: () => void;
}

export const useActiveModalStore = create<ModalState>((set) => ({
  activeModal: null,
  data: null,
  openModal: (type, data = null) => set({ activeModal: type, data }),
  closeModal: () => set({ activeModal: null, data: null }),
}));

// Usage Example:
// Modal Management with Store
// const { activeModal, data, openModal, closeModal } = useActiveModalStore();
// openModal('edit', { id: 123, name: 'Sample Workout' });
// activeModal === 'edit' && <EditWorkoutModal workout={data} onClose={closeModal} />;
