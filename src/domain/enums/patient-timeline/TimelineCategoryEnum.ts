import { TimelineEventTypeEnum } from './TimelineEventTypeEnum';

export enum TimelineCategoryEnum {
  DIET = 'diet',
  WORKOUT = 'workout',
  RECORD = 'record',
  GOAL = 'goal',
}

export function getTimelineCategory(eventType: TimelineEventTypeEnum): TimelineCategoryEnum {
  if (eventType.startsWith('diet_')) {
    return TimelineCategoryEnum.DIET;
  }

  if (eventType.startsWith('workout_')) {
    return TimelineCategoryEnum.WORKOUT;
  }

  if (eventType.startsWith('goal_')) {
    return TimelineCategoryEnum.GOAL;
  }

  if (eventType.startsWith('record_')) {
    return TimelineCategoryEnum.RECORD;
  }

  throw new Error('Unknown TimelineEventType category');
}
