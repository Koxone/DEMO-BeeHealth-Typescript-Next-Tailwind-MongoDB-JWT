import { ProcessSaleDTO } from '@/presentation/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useProcessSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProcessSaleDTO) => {
      const response = await fetch('/api/inventory/sale/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to process sale');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: ['sales'] });
    },
  });
};
