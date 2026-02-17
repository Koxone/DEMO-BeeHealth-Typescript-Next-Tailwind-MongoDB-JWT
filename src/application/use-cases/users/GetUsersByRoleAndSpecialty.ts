import { User } from '@/domain/entities/user/User';
import { UserRepository } from '@/domain/repositories/user/UserRepository';
import { UserRole, UserSpecialty } from '@/domain/enums/';

export class GetUsersByRoleAndSpecialty {
  constructor(private userRepository: UserRepository) {}

  async execute(role: UserRole, specialty: UserSpecialty): Promise<User[]> {
    return this.userRepository.findByRoleAndSpecialty(role, specialty);
  }
}
