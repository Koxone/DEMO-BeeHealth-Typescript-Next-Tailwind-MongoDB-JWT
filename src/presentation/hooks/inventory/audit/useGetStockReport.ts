import { useQuery } from '@tanstack/react-query';
import { StockStatusReport } from '@/presentation/types';

export const useGetStockReport = () => {
  return useQuery<StockStatusReport>({
    queryKey: ['audit', 'stock-report'],
    queryFn: async () => {
      const response = await fetch('/api/inventory/audit/stock-report');
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch stock report');
      }
      return response.json();
    },
  });
};
