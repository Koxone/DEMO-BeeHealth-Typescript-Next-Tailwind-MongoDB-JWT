import { useState } from 'react';

export function useEditClinicalRecord() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const editClinicalRecord = async (recordId, fields) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/clinicalRecords/${recordId}/edit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(fields),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to edit clinical record');
      }

      return await res.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, editClinicalRecord };
}

// Usage example:
// const { isLoading, error, editClinicalRecord } = useEditClinicalRecord();
// await editClinicalRecord(recordId, { answers: [...], recordDate: '2024-06-15' });
