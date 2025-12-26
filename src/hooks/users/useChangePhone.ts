import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// Types
import { CurrentUserData } from '@/types/user/user.types';

interface UpdatePhonePayload {
  userId: string;
  phone: string;
}

interface UpdatePhoneResponse {
  message: string;
  user: CurrentUserData;
}

interface UpdatePhoneError {
  error: string;
}

async function updateUserPhone({
  userId,
  phone,
}: UpdatePhonePayload): Promise<UpdatePhoneResponse> {
  const response = await fetch(`/api/users/${userId}/edit/phone`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ phone }),
  });

  if (!response.ok) {
    const errorData: UpdatePhoneError = await response.json();
    throw new Error(errorData.error || 'Error updating phone');
  }

  return response.json();
}

export function useChangeUserPhone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserPhone,
    onSuccess: (data) => {
      toast.success(data.message || 'Teléfono actualizado correctamente');

      // Cache
      queryClient.invalidateQueries({ queryKey: ['user', data.user.id] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al actualizar el teléfono');
    },
  });
}

// Uso:
// const { mutate: changePhone } = useChangeUserPhone();
