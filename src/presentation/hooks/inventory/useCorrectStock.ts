import { StockCorrectionDTO } from '@/presentation/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCorrectStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: StockCorrectionDTO) => {
      const response = await fetch('/api/inventory/stock/correction', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to correct stock');
      }

      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['inventory', variables.productId] });
      queryClient.invalidateQueries({ queryKey: ['stock-movements', variables.productId] });
    },
  });
};
