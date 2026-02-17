import { useQuery } from '@tanstack/react-query';

export const useGetTotalItemsCount = () => {
  return useQuery({
    queryKey: ['audit', 'total-items'],
    queryFn: async () => {
      const response = await fetch('/api/inventory/audit/total-items');
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch total items count');
      }
      return response.json();
    },
  });
};
