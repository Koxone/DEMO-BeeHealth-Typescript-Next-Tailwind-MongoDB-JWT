'use client';

import { useMemo, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '@/zustand/useAuthStore';

// Types
import { InventoryItem } from '@/@types/inventory/inventory.types';

async function fetchInventory(): Promise<InventoryItem[]> {
  const res = await fetch('/api/inventory', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    throw new Error('Error fetching inventory data');
  }

  return res.json();
}

export function useGetFullInventory() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['inventory'],
    queryFn: fetchInventory,
    enabled: !!user,
  });

  // Filter inventory based on user role and specialty
  const inventory = useMemo(() => {
    if (!data) return [];

    return user?.role === 'employee' || !user?.specialty
      ? data
      : data.filter(
          (item) => item?.product?.specialty && item?.product?.specialty === user?.specialty
        );
  }, [data, user?.role, user?.specialty]);

  const criticalItems = useMemo(
    () => inventory.filter((i) => i.quantity < i.minStock),
    [inventory]
  );

  const lowItems = useMemo(() => inventory.filter((i) => i.quantity === i.minStock), [inventory]);

  const totalAlerts = useMemo(
    () => criticalItems.length + lowItems.length,
    [criticalItems, lowItems]
  );

  const refetch = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['inventory'] });
  }, [queryClient]);

  const setInventory = useCallback(
    (newInventory: InventoryItem[] | ((prev: InventoryItem[]) => InventoryItem[])) => {
      queryClient.setQueryData(['inventory'], (old: InventoryItem[] | undefined) => {
        if (typeof newInventory === 'function') {
          return newInventory(old || []);
        }
        return newInventory;
      });
    },
    [queryClient]
  );

  return {
    inventory,
    isLoading,
    error: error ? (error as Error).message : null,
    setInventory,

    criticalItems,
    lowItems,
    totalAlerts,

    refetch,
  };
}

// Usage example:
// const { inventory, isLoading, error, criticalItems, lowItems, totalAlerts, refetch, setInventory } = useGetFullInventory();
