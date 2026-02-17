// User response DTO
import { User } from '@/domain/entities/user/User';

export class UserResponseDTO {
  // Mapping
  static fromDomain(user: User) {
    return {
      id: user.getId(),
      email: user.getEmail(),
      name: user.getName(),
      lastName: user.getLastName(),
      role: user.getRole(),
      specialty: user.getSpecialty(),
      phone: user.getPhone(),
      avatar: user.getAvatar(),
      isActive: user.getIsActive(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    };
  }
}
