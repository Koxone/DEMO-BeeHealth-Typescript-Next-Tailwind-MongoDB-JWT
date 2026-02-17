import { UserRepository } from '@/domain/repositories/user/UserRepository';
import { PasswordHasher } from '@/domain/services/auth/PasswordHasher';
import { Email } from '@/domain/value-objects/Email';
import { User } from '@/domain/entities/user/User';

// Error imports
import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError';
import { UserInactiveError } from '@/domain/errors/UserInactiveError';

interface LoginUserInput {
  email: string;
  password: string;
}

export class LoginUser {
  private userRepository: UserRepository;
  private passwordHasher: PasswordHasher;

  constructor(userRepository: UserRepository, passwordHasher: PasswordHasher) {
    // Dependencies
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
  }

  async execute(input: LoginUserInput): Promise<User> {
    // Email value object
    const email = Email.create(input.email);

    // Find user
    const user = await this.userRepository.findByEmail(email.getValue());
    if (!user) {
      throw new InvalidCredentialsError();
    }

    // Check active
    if (!user.getIsActive()) {
      throw new UserInactiveError();
    }

    // Compare password
    const isValid = await this.passwordHasher.compare(input.password, user.getPasswordHash());

    if (!isValid) {
      throw new InvalidCredentialsError();
    }

    // Authenticated user
    return user;
  }
}
