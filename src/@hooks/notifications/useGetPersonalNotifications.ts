'use client';

import { useQuery } from '@tanstack/react-query';

// Types
interface Notification {
  _id: string;
  title: string;
  message: string;
  scope: 'personal';
  createdAt: string;
}

// Fetch
const fetchPersonalNotifications = async (userId: string): Promise<Notification[]> => {
  const res = await fetch('/api/notifications/get/personal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  if (!res.ok) {
    throw new Error('Error fetching personal notifications');
  }

  const data = await res.json();
  return data.notifications;
};

// Hook
export const useGetPersonalNotifications = (userId: string) => {
  return useQuery({
    queryKey: ['personal-notifications', userId],
    queryFn: () => fetchPersonalNotifications(userId),
    enabled: !!userId,
  });
};

// Usage example:
// const { data: notifications, isLoading, error } = useGetPersonalNotifications(currentUser._id);
