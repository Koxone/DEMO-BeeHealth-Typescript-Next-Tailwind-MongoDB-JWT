import { useState } from 'react';

export function useDeleteClinicalRecord() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteClinicalRecord = async (recordId) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/clinicalRecords/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id: recordId }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to delete clinical record');
      }

      return await res.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, deleteClinicalRecord };
}
