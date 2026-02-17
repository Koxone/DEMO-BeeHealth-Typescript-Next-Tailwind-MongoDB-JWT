import { useQuery } from '@tanstack/react-query';

export const useGetTotalCostByCategory = (category: string) => {
  return useQuery({
    queryKey: ['audit', 'total-cost', category],
    queryFn: async () => {
      const response = await fetch(`/api/inventory/audit/total-cost?category=${category}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch total cost');
      }
      return response.json();
    },
    enabled: !!category,
  });
};
