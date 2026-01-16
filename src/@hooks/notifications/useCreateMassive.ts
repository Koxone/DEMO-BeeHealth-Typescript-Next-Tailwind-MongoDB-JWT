import { useState } from 'react';

// Types
interface CreateMassiveAnnouncementData {
  scope: 'massive';
  category: string;
  type: string;
  message: string;
  notes?: string;
  relatedDate?: string;
  scheduledAt?: string;
  expiresAt?: string;
}

export function useCreateMassiveAnnouncement() {
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Create
  const createMassiveAnnouncement = async (data: Omit<CreateMassiveAnnouncementData, 'scope'>) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/notifications/create/massive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          scope: 'massive',
        }),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || 'Failed to create announcement');
      }

      return await res.json();
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createMassiveAnnouncement,
    isLoading,
    error,
  };
}

// Usage example:
// const { createMassiveAnnouncement, isLoading, error } = useCreateMassiveAnnouncement();
// await createMassiveAnnouncement({ category: 'info', type: 'general', message: '...' });
