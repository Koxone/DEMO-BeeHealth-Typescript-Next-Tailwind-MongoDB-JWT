import { useMutation, useQueryClient } from '@tanstack/react-query';

// @hook     useCancelConsult
// @desc     Cancel a consult and revert inventory
export function useCancelConsult() {
  // Cache
  const queryClient = useQueryClient();

  return useMutation({
    // Request
    mutationFn: async ({ consultId, reason }: { consultId: string; reason: string }) => {
      const response = await fetch('/api/consults/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ consultId, reason }),
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.error || 'Error cancelling consultation');
      }

      return response.json();
    },

    // Success
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consults'] });
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}

// Usage Example:
// const { mutate: cancelConsult, isLoading, error } = useCancelConsult();
// cancelConsult(consultId);
