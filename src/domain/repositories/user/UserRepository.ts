import { User } from '@/domain/entities/user/User';
import { UserRole, UserSpecialty } from '@/domain/enums/';

export interface UserRepository {
  // Finds operations
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByRole(role: UserRole): Promise<User[]>;
  findByPhone(phone: string): Promise<User | null>;
  findBySpecialty(specialty: UserSpecialty): Promise<User[]>;
  findByRoleAndSpecialty(role: UserRole, specialty: UserSpecialty): Promise<User[]>;

  // Existence checks
  existsByEmail(email: string): Promise<boolean>;
  existsById(id: string): Promise<boolean>;

  // Data manipulation
  update(user: User): Promise<void>;
  save(user: User): Promise<void>;
}
