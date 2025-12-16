import { useMutation } from '@tanstack/react-query';

export function useEditDiet() {
  const mutation = useMutation({
    mutationFn: async ({ dietId, fields }: { dietId: string; fields: any }) => {
      const res = await fetch(`/api/diets/${dietId}/edit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(fields),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to edit diet');
      }

      return res.json();
    },
  });

  return {
    isLoading: mutation.isPending,
    error: mutation.error?.message || null,

    editDiet: (dietId: string, fields: any) => mutation.mutateAsync({ dietId, fields }),

    refetch: mutation.reset,
  };
}
