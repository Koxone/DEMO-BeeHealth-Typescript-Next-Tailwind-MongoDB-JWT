export interface WorkoutEntity {
  _id: string;
  name: string;
  type: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
  about: string;
  instructions: string[];
  benefits: string[];
  cautions: string[];
  images: string[];
  video: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserWorkout {
  workout: WorkoutEntity;
  isActive: boolean;
  assignedAt: string;
  finishedAt?: string;
}

export interface WorkoutsDataResponse {
  success: boolean;
  data: UserWorkout[];
}

export interface WorkoutFeedbackModalProps {
  selectedWorkout: UserWorkout;
  userData: any;
  setShowSuccessModal: (show: boolean) => void;
  setSuccessTitle: (title: string) => void;
  setSuccessMessage: (message: string) => void;
  setShowToggleModal?: (show: boolean) => void;
  refetchWorkouts: any;
  refetchTimeline: any;
  isProcessing?: boolean;
  recordId: string | null;
  setShowRenewModal?: (show: boolean) => void;
}

export type ComplianceStatus = 'pending' | 'completed' | 'partial' | 'not_completed';
