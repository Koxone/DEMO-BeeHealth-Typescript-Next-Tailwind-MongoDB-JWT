'use client';

import { useMemo, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useGetCurrentUser } from '@/@hooks/users/useGetCurrentUser';

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
  // Get current user
  const {
    user: currentUser,
    isLoading: isLoadingCurrentUser,
    refetch: refetchCurrentUser,
  } = useGetCurrentUser();

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['inventory'],
    queryFn: fetchInventory,
    enabled: !!currentUser,
  });

  // Filter inventory based on user role and specialty
  const inventory = useMemo(() => {
    if (!data) return [];

    return currentUser?.role === 'employee' || !currentUser?.specialty
      ? data
      : data.filter(
          (item) => item?.product?.specialty && item?.product?.specialty === currentUser?.specialty
        );
  }, [data, currentUser?.role, currentUser?.specialty]);

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
