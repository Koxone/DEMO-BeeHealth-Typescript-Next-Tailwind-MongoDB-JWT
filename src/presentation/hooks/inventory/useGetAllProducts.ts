import { useQuery } from '@tanstack/react-query';

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ['products', 'all'],
    queryFn: async () => {
      const response = await fetch('/api/inventory/products/get-all');

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch all products');
      }

      return response.json();
    },
  });
};
