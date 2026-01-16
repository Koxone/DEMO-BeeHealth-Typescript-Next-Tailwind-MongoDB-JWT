// Custom hook
import { useMutation } from '@tanstack/react-query';

// Types
interface RemoveDietParams {
  userId: string;
  dietId: string;
  clinicalRecord: string;
  doctorNotes?: string;
}

interface RemoveDietResponse {
  message: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
    avatar?: string;
    role: string;
    specialty: string;
    diets: any[];
    updatedAt: string;
  };
}

export function useRemoveDiet() {
  // Mutation
  const mutation = useMutation({
    mutationFn: async ({ userId, dietId, clinicalRecord, doctorNotes }: RemoveDietParams) => {
      const res = await fetch(`/api/users/${userId}/diets/remove`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ dietId, clinicalRecord, doctorNotes }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to remove diet');
      }

      return (await res.json()) as RemoveDietResponse;
    },
  });

  return {
    removeDiet: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error?.message ?? null,
  };
}

// Usage Example:
// const { removeDiet, isLoading, error } = useRemoveDiet();
// await removeDiet({ userId: '123', dietId: '456', clinicalRecord: '789' });
