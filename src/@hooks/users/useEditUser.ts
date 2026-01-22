// @/@hooks/users/useEditUser.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface EditUserParams {
  userId: string;
  fullName?: string;
  email?: string;
  phone?: string;
  initialWeight?: number;
  initialSize?: number;
  currentSize?: number;
  currentWeight?: number;
}

interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  initialWeight?: number;
  initialSize?: number;
  currentWeight?: number;
  currentSize?: number;
  [key: string]: any;
}

export const useEditUser = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, EditUserParams>({
    mutationFn: async ({
      userId,
      fullName,
      email,
      phone,
      initialWeight,
      initialSize,
      currentWeight,
      currentSize,
    }: EditUserParams) => {
      const response = await fetch('/api/users/patients/edit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          fullName,
          email,
          phone,
          initialWeight,
          initialSize,
          currentWeight,
          currentSize,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al actualizar usuario');
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['allPatients'] });
      queryClient.invalidateQueries({ queryKey: ['clinical-records', userId] });
    },
    onError: (error: Error) => {
      console.error('Error en useEditUser:', error.message);
    },
  });
};

// Usage Example:
// const { mutate: editUser, isPending } = useEditUser();
// editUser({ userId: '123', fullName: 'Nuevo Nombre' }, { onSuccess: () => { ... } });
