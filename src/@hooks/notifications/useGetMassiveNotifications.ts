'use client';

import { useQuery } from '@tanstack/react-query';

// Types
interface Notification {
  _id: string;
  title: string;
  message: string;
  scope: 'massive';
  createdAt: string;
  readBy: string[];
  isActive: boolean;
}

// Fetch
const fetchMassiveAnnouncements = async (): Promise<Notification[]> => {
  const res = await fetch('/api/notifications/get/massive');

  if (!res.ok) {
    throw new Error('Error fetching massive announcements');
  }

  const data = await res.json();
  return data.announcements;
};

// Hook
export const useGetMassiveNotifications = (role?: string) => {
  return useQuery({
    queryKey: ['massive-announcements'],
    queryFn: fetchMassiveAnnouncements,
    refetchInterval: role === 'patient' ? 30_000 : false,
    refetchOnWindowFocus: true,
    staleTime: 25_000,
  });
};

// Usage example:
// const { data, isLoading, error } = useGetMassiveNotifications(userRole);
