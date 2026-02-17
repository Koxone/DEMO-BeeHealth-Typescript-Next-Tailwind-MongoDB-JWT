import { useQuery } from '@tanstack/react-query';

export const useGetProductsBySpecialty = (specialty: string) => {
  return useQuery({
    queryKey: ['products', 'specialty', specialty],
    queryFn: async () => {
      const response = await fetch(
        `/api/inventory/products/get-by-specialty?specialty=${specialty}`
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch products by specialty');
      }

      return response.json();
    },
    enabled: !!specialty,
  });
};
