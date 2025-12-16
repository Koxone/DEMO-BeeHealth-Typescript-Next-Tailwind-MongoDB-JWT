import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

// Schema de respuesta
const assignDietResponseSchema = z.object({
  message: z.string(),
  user: z.object({
    id: z.string(),
    fullName: z.string(),
    email: z.string(),
    phone: z.string(),
    avatar: z.string().optional(),
    role: z.enum(['patient', 'doctor', 'admin', 'employee']),
    specialty: z.enum(['weight', 'dental', 'stetic', 'none']),
    diets: z.array(z.any()),
    updatedAt: z.string(),
  }),
});

export type AssignDietResponse = z.infer<typeof assignDietResponseSchema>;

export function useAssignDiet() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async ({
      patientId,
      dietId,
      assignedAt,
      clinicalRecord,
    }: {
      patientId: string;
      dietId: string;
      assignedAt?: string;
      clinicalRecord?: string;
    }) => {
      const res = await fetch(`/api/users/${patientId}/diets/assign`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          dietId,
          assignedAt,
          clinicalRecord,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to assign diet');
      }

      const json = await res.json();
      const result = assignDietResponseSchema.safeParse(json);

      if (!result.success) {
        console.error(result.error.format());
        throw new Error('Invalid response data');
      }

      return result.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-diets', variables.patientId] });
    },
  });

  return {
    assignDiet: mutateAsync,
    isLoading: isPending,
    error: error?.message ?? null,
  };
}

// Usage Example:
// const { assignDiet, isLoading, error } = useAssignDiet();
// await assignDiet({ patientId: '123', dietId: '456', clinicalRecord: '789' });

// const { assignDiet, isLoading, error } = useAssignDiet();

// const handleAssign = async () => {
//   try {
//     await assignDiet({ patientId: userId, dietId: selectedDietId, clinicalRecord: recordId });
//   } catch (err) {
//     console.error(err);
//   }
// };
