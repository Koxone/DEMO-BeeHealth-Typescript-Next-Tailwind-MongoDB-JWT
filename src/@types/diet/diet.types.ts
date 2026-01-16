import { IDiet } from '../../models/Diet';

export type ComplianceStatus = 'pending' | 'completed' | 'partial' | 'not_completed';

export interface DietFeedbackModalProps {
  selectedDiet: UserDiet;
  userData: any;
  setShowSuccessModal: (show: boolean) => void;
  setSuccessTitle: (title: string) => void;
  setSuccessMessage: (message: string) => void;
  setShowToggleModal?: (show: boolean) => void;
  refetchDiets: any;
  refetchTimeline: any;
  isProcessing?: boolean;
  recordId: string | null; 
  setShowRenewModal?: (show: boolean) => void;
}

export type UserDiet = {
  _id: string;
  diet: IDiet & { _id: string };
  isActive: boolean;
  assignedAt: string;
  finishedAt?: string;
};
