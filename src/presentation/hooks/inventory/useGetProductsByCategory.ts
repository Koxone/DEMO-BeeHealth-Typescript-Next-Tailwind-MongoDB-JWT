import { useQuery } from '@tanstack/react-query';

export const useGetProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: async () => {
      const response = await fetch(`/api/inventory/products/get-by-category?category=${category}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch products by category');
      }

      return response.json();
    },
    enabled: !!category,
  });
};
