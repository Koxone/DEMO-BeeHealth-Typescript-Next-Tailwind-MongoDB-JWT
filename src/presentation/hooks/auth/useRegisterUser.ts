'use client';

import { useMutation } from '@tanstack/react-query';

// Types
import { UserSpecialty } from '@/domain/enums/';
import { queryClient } from '@/presentation/providers/tanstackQueryClient';

// Input type
type RegisterUserInput = {
  email: string;
  password: string;
  name: string;
  lastName: string;
  phone: string;
  specialty: UserSpecialty;
};

// Hook
export function useRegisterUser() {
  return useMutation({
    // Mutation function
    mutationFn: async (input: RegisterUserInput) => {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...input,
          specialty: input.specialty.toLowerCase(),
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to register user');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users', 'patient', 'weight'],
      });
    },
  });
}

// Usage example:
// const registerUser = useRegisterUser();
// registerUser.mutate({ email, password, name, lastName, phone, specialty });
