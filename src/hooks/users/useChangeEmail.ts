import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface UpdateEmailPayload {
  userId: string;
  email: string;
}

interface UpdateEmailResponse {
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

interface UpdateEmailError {
  error: string;
}

async function updateUserEmail({
  userId,
  email,
}: UpdateEmailPayload): Promise<UpdateEmailResponse> {
  const response = await fetch(`/api/users/${userId}/edit/email`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData: UpdateEmailError = await response.json();
    throw new Error(errorData.error || 'Error updating email');
  }

  return response.json();
}

export function useChangeUserEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserEmail,
    onSuccess: (data) => {
      toast.success(data.message || 'Email actualizado correctamente');

      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['user', data.user.id] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al actualizar el email');
    },
  });
}

// Uso:
// const { mutate: changeEmail, isPending } = useChangeUserEmail();
// changeEmail({ userId: 'user-id', email: 'nuevo@email.com' });
