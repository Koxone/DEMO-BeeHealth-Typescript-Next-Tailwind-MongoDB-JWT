import { useQuery } from '@tanstack/react-query';
import { UserSpecialty, UserRole } from '@/domain/enums/';
import { PatientListItemDTOPresentation } from '@/presentation/types/';

export function useGetUsersByRoleAndSpecialty(role: UserRole, specialty: UserSpecialty) {
  return useQuery<PatientListItemDTOPresentation[]>({
    queryKey: ['users', role, specialty],
    queryFn: async (): Promise<PatientListItemDTOPresentation[]> => {
      const res = await fetch(`/api/users?role=${role}&specialty=${specialty}`);

      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }

      return res.json();
    },
    enabled: !!role && !!specialty,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

// Usage example:
// const { data: patients, isLoading, error } = useGetUsersByRoleAndSpecialty(UserRole.PATIENT, UserSpecialty.WEIGHT);
// console.log(patients);
