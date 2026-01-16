import { useState } from 'react';

interface WorkoutPayload {
  patients?: string[];
  name: string;
  type: string;
  difficulty: string;
  duration: number;
  about: string;
  instructions: string[];
  benefits: string[];
  cautions: string[];
  images: string[];
  video: string;
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

export function useCreateWorkout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createWorkout = async (payload: WorkoutPayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/workouts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setError(`Error HTTP ${res.status}: ${res.statusText}`);
        return null;
      }

      let data: ApiResponse<any>;
      try {
        data = await res.json();
      } catch (parseError) {
        setError('Error al procesar la respuesta del servidor');
        console.error('JSON Parse Error:', parseError);
        return null;
      }

      if (!data.ok) {
        const errorMessage = data.error?.message || 'Error desconocido';
        setError(errorMessage);
        return null;
      }

      return data.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error del servidor';
      setError(errorMessage);
      console.error('Create Workout Error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createWorkout, loading, error };
}
