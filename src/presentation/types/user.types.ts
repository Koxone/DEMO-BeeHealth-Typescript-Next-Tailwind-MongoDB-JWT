import { UserSpecialty, UserRole } from '@/domain/enums/';

export interface UserDTOPresentation {
  id: string;
  email: string;
  name: string;
  lastName: string;
  fullName: string;
  role: UserRole;
  specialty: UserSpecialty;
  phone: string;
  avatar: string | null;
  isActive: boolean;
  createdAt: string; // ISO String
  updatedAt: string; // ISO String
}

export interface PatientListItemDTOPresentation {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string | null;
  role: UserRole;
  specialty: UserSpecialty;
  isActive: boolean;
  hasRecord?: boolean;
  lastVisitAt?: string | null; // ISO String or null
}

export interface PatientClinicalStatsDTOPresentation {
  patientId: string;
  currentWeight: number | null;
  currentSize: number | null;
  weightLoss: number;
  totalConsultations: number;
}
