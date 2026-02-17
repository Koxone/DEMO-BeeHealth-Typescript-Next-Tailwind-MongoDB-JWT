import { useQuery } from '@tanstack/react-query';

export const useGetProductStock = (productId: string) => {
  return useQuery({
    queryKey: ['inventory', productId],
    queryFn: async () => {
      if (!productId) return null;

      const response = await fetch(`/api/inventory/stock/get-by-product?productId=${productId}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch stock');
      }

      return response.json();
    },
    enabled: !!productId,
  });
};
