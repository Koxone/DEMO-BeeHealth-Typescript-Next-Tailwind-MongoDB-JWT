import { useState } from 'react';

export function useAssignPatientToDiet() {
  const [patientToAssign, setPatientToAssign] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const editPatients = async (dietId, patients) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/diets/${dietId}/edit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ patients }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to edit patients');
      }

      return await res.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { patientToAssign, setPatientToAssign, isLoading, error, editPatients };
}

// Needs:
// specialty
// dietId
// refetch
// diet
