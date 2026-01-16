import { useMutation, useQueryClient } from '@tanstack/react-query';

// Types
interface DeactivateNotificationPayload {
  notificationId: string;
}

interface DeactivateNotificationResponse {
  ok: boolean;
  message: string;
}

export function useDeactivateMassiveNotification() {
  // Cache
  const queryClient = useQueryClient();

  // Mutation
  const mutation = useMutation<
    DeactivateNotificationResponse,
    Error,
    DeactivateNotificationPayload
  >({
    // Request
    mutationFn: async ({ notificationId }) => {
      const res = await fetch('/api/notifications/toggle/massive', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to deactivate notification');
      }

      return res.json();
    },

    // Success
    onSuccess: () => {
      // Refresh notifications
      queryClient.invalidateQueries({ queryKey: ['massive-notifications'] });
      queryClient.invalidateQueries({ queryKey: ['massive-announcements'] });
      queryClient.invalidateQueries({ queryKey: ['personal-notifications'] });
    },
  });

  return {
    deactivateNotification: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}

// Usage Example:
// const { deactivateNotification, isLoading, error } = useDeactivateMassiveNotification();
// await deactivateNotification({ notificationId: 'some-id' });