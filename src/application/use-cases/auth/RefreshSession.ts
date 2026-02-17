import { UserRepository } from '@/domain/repositories/user/UserRepository';
import { UserNotFoundError } from '@/domain/errors/UserNotFoundError';

export class RefreshSession {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
