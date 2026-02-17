import { DietPlanStatusEnum } from '@/domain/enums/';
import { DietRestrictionDTOPresentation } from './diets.types';

export interface DietSnapshotResponseDTOPresentation {
  originalDietId: string;
  name: string;
  category: string;
  description: string;
  instructions: string;
  allowedFoods: DietRestrictionDTOPresentation;
  forbiddenFoods: DietRestrictionDTOPresentation;
  allowedLiquids: DietRestrictionDTOPresentation;
  forbiddenLiquids: DietRestrictionDTOPresentation;
  ingredients: string[];
  images: string[];
}

export interface DietPlanResponseDTOPresentation {
  id: string;
  patientId: string;
  dietId: string;
  startDate: string;
  endDate: string;
  dietSnapshot: DietSnapshotResponseDTOPresentation;
  status: DietPlanStatusEnum;
  createdAt: string;
  updatedAt: string;
}
