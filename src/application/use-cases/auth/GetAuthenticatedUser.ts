import { UserRepository } from '@/domain/repositories/user/UserRepository';
import { User } from '@/domain/entities/user/User';
import { UserNotFoundError } from '@/domain/errors/UserNotFoundError';

export class GetAuthenticatedUser {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
