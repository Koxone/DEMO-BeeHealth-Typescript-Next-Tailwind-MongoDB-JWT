import { GoalStatusEnum, UserSpecialty } from '@/domain/enums';
import { GoalResolution } from '@/domain/services/goal/GoalProgressService';

export interface GoalDTOPresentation {
  id: string;
  patientId: string;
  consultationId: string;
  specialty: UserSpecialty;
  initialValue: number;
  targetValue: number;
  finalValue?: number;
  status: GoalStatusEnum;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  resolution: GoalResolution;
  currentWeight?: number | null;
}
