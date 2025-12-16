import { useMutation } from '@tanstack/react-query';
import type { TimelineEvent, TimelineCreateRequest } from '@/types/timelines/timelines.types';

interface CreateTimelineParams extends TimelineCreateRequest {
  patientId: string;
}

export function useCreateTimelineEvent() {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async ({ patientId, ...data }: CreateTimelineParams) => {
      const res = await fetch(`/api/users/${patientId}/timeline/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || 'Failed to create timeline event');
      }

      const json = (await res.json()) as { ok: boolean; event: TimelineEvent };
      return json.event;
    },
  });

  return {
    createTimelineEvent: mutateAsync,
    isLoading: isPending,
    error: error?.message ?? null,
  };
}

// Usage Example:
// const { createTimelineEvent, isLoading, error } = useCreateTimelineEvent();

// await createTimelineEvent({
//   patientId: '123',
//   eventType: 'diet_assigned',
//   dietId: '456',
//   snapshot: { dietName: 'Dieta Vegana' }
// });
