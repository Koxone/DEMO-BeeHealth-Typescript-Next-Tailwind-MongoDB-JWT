import { Goal } from '../entities';

export interface GoalWithProgress {
  goal: Goal;
  resolution: 'COMPLETE' | 'FAIL' | 'IN_PROGRESS';
  currentWeight?: number;
}
