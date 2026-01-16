import { useMutation, useQueryClient } from '@tanstack/react-query';

// Types
interface MarkAsReadPayload {
  notificationId: string;
}

interface MarkAsReadResponse {
  ok: boolean;
  message: string;
}

export function useMarkNotificationAsRead() {
  // Cache
  const queryClient = useQueryClient();

  // Mutation
  const mutation = useMutation<MarkAsReadResponse, Error, MarkAsReadPayload>({
    // Request
    mutationFn: async ({ notificationId }) => {
      const res = await fetch('/api/notifications/edit/massive', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to mark notification as read');
      }

      return res.json();
    },

    // Success
    onSuccess: () => {
      // Invalidate notifications
      queryClient.invalidateQueries({ queryKey: ['massive-notifications'] });
      queryClient.invalidateQueries({ queryKey: ['massive-announcements'] });
      queryClient.invalidateQueries({ queryKey: ['personal-notifications'] });
    },
  });

  return {
    markAsRead: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}

// Usage example:
// const { markAsRead, isLoading, error } = useMarkNotificationAsRead();
// await markAsRead({ notificationId: 'some-id' });