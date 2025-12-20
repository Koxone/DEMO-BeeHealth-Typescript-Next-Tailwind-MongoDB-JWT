'use client';

import { useMutation } from '@tanstack/react-query';

// Types
interface UpdateAvatarPayload {
  userId: string;
  avatar: string;
}

interface UpdateAvatarResponse {
  message: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    avatar: string;
    role: string;
    specialty: string;
    isActive: boolean;
    updatedAt: string;
  };
}

// Request
async function updateAvatar({ userId, avatar }: UpdateAvatarPayload) {
  const res = await fetch(`/api/users/${userId}/edit/avatar`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ avatar }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || 'Failed to update avatar');
  }

  return res.json() as Promise<UpdateAvatarResponse>;
}

// Hook
export function useChangeAvatar() {
  return useMutation({
    mutationFn: updateAvatar,
  });
}

// Usage example:
// const { mutate: updateAvatar, isLoading, isError, data, error } = useUpdateAvatar();
// updateAvatar({ userId: '123', avatar: 'new-avatar-url' });
