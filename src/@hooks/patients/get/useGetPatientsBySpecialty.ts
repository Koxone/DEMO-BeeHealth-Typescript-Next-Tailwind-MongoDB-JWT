import { useGetAllPatients } from './useGetAllPatients';

export function useGetPatientsBySpecialty(specialty: string) {
  const { patients, isLoading, error, refetch } = useGetAllPatients();

  const filteredPatients = patients.filter((patient) => patient.specialty === specialty);

  return {
    patients: filteredPatients,
    isLoading,
    error,
    refetch,
  };
}

// Usage Example:
// const { patients, isLoading, error, refetch } = useGetPatientsBySpecialty('Cardiology');