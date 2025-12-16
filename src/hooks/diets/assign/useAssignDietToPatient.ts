import { useState } from 'react';

export function useAssignDietToPatient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const assignDiets = async (patientId: string, dietIds: string[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const promises = dietIds.map((dietId) =>
        fetch(`/api/diets/${dietId}/assign-patient`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ patientId }),
        })
      );

      const responses = await Promise.all(promises);

      for (const res of responses) {
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Failed to assign diet');
        }
      }

      return true;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { assignDiets, isLoading, error };
}
