export type GoalResolution = 'COMPLETE' | 'FAIL' | 'IN_PROGRESS';

export const calculateResolution = (target: number, current: number): GoalResolution => {
  return current <= target ? 'COMPLETE' : 'FAIL';
};
