import { useState, useEffect } from 'react';
import { ZMed, ZMedArray } from '@/zod/product.schema';

export function useGetMeds(type: string) {
  const [meds, setMeds] = useState<ZMed[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Loading
        setIsLoading(true);

        // Fetch request
        const res = await fetch('/api/products/types', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type }),
        });

        if (!res.ok) {
          throw new Error('Failed to fetch meds');
        }

        const json = await res.json();

        // Zod validation
        const data = ZMedArray.parse(json.products);

        // Set state
        setMeds(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [type]);

  return { meds, isLoading, error };
}
