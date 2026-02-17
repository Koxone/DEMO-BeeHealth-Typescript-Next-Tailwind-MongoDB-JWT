export enum TimelineEventTypeEnum {
  // DietPlan Events
  DIET_ASSIGNED = 'diet_assigned',
  DIET_COMPLETED = 'diet_completed',
  DIET_CANCELLED = 'diet_cancelled',
  DIET_RENEWED = 'diet_renewed',

  // WorkoutPlan Events
  WORKOUT_ASSIGNED = 'workout_assigned',
  WORKOUT_CANCELLED = 'workout_cancelled',
  WORKOUT_COMPLETED = 'workout_completed',
  WORKOUT_RENEWED = 'workout_renewed',

  // Goal Events
  GOAL_CREATED = 'goal_created',
  GOAL_FAILED = 'goal_failed',
  GOAL_COMPLETED = 'goal_completed',
  GOAL_CANCELLED = 'goal_cancelled',

  // Consultation Events
  RECORD_CREATED = 'record_created',
  RECORD_EDITED = 'record_edited',
  RECORD_DELETED = 'record_deleted',
}
