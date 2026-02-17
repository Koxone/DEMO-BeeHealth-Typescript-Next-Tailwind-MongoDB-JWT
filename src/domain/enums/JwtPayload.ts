import { UserRole } from '@/domain/enums/';

export interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
}
