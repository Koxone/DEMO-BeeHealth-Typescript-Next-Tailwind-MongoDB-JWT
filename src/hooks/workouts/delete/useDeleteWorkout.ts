import { useState } from 'react';

interface WorkoutPayload {
  id: string;
}

interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    reason: string;
  };
}

export function useDeleteWorkout() {
  // State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteWorkout = async (payload: WorkoutPayload) => {
    // Reset
    setLoading(true);
    setError(null);

    try {
      // Request
      const res = await fetch('/api/workouts/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setError(`Error HTTP ${res.status}: ${res.statusText}`);
        return null;
      }

      // Parse
      let data: ApiResponse<any>;
      try {
        data = await res.json();
      } catch {
        setError('Error al procesar la respuesta del servidor');
        return null;
      }

      if (!data.ok) {
        setError(data.error?.message || 'Error desconocido');
        return null;
      }

      return data.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error del servidor');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { deleteWorkout, loading, error };
}
