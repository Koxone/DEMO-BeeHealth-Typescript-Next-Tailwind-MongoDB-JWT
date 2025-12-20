import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface UpdatePasswordPayload {
  userId: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface UpdatePasswordResponse {
  message: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    avatar?: string;
    role: string;
    specialty?: string;
    isActive: boolean;
    updatedAt: string;
  };
}

interface UpdatePasswordError {
  error: string;
}

async function updateUserPassword({
  userId,
  currentPassword,
  newPassword,
  confirmPassword,
}: UpdatePasswordPayload): Promise<UpdatePasswordResponse> {
  const response = await fetch(`/api/users/${userId}/edit/password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
  });

  if (!response.ok) {
    const errorData: UpdatePasswordError = await response.json();
    throw new Error(errorData.error || 'Error updating password');
  }

  return response.json();
}

export function useChangeUserPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserPassword,
    onSuccess: (data) => {
      toast.success(data.message || 'Contraseña actualizada correctamente');

      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['user', data.user.id] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al actualizar la contraseña');
    },
  });
}

// Uso:
// const { mutate: changePassword, isPending } = useChangeUserPassword();
// changePassword({
//   userId: 'user-id',
//   currentPassword: 'oldpass123',
//   newPassword: 'newpass123',
//   confirmPassword: 'newpass123'
// });
