import { UserRepository } from '@/domain/repositories/user/UserRepository';
import { Email } from '@/domain/value-objects/Email';

//? Defines the data that is required to change a user's email
interface ChangeEmailInput {
  userId: string;
  newEmail: string;
}

export class ChangeEmail {
  // Dependency injection of the UserRepository
  constructor(private userRepository: UserRepository) {}

  async execute(input: ChangeEmailInput): Promise<void> {
    if (!input.userId || input.userId.trim().length === 0) {
      throw new Error('Invalid user');
    }

    const newEmail = Email.create(input.newEmail);

    const user = await this.userRepository.findById(input.userId.trim());
    if (!user) {
      throw new Error('User not found');
    }

    // If the email is the same, do nothing
    if (user.getEmail() === newEmail.getValue()) {
      return;
    }

    // Check that it is not in use by ANOTHER user
    if (await this.userRepository.existsByEmail(newEmail.getValue())) {
      throw new Error('Email already in use');
    }

    user.changeEmail(newEmail);

    await this.userRepository.update(user);
  }
}
