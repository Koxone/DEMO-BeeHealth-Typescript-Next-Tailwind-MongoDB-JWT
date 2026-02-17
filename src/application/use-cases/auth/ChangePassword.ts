import { UserRepository } from '@/domain/repositories/user/UserRepository';
import { PasswordHasher } from '@/domain/services/auth/PasswordHasher';
import { UserPasswordHistoryRepository } from '@/domain/repositories/user/UserPasswordHistoryRepository';
import { UserPasswordHistory } from '@/domain/entities/user/UserPasswordHistory';

interface ChangePasswordInput {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export class ChangePassword {
  private userRepository: UserRepository;
  private passwordHasher: PasswordHasher;
  private passwordHistoryRepository: UserPasswordHistoryRepository;

  constructor(
    userRepository: UserRepository,
    passwordHasher: PasswordHasher,
    passwordHistoryRepository: UserPasswordHistoryRepository
  ) {
    // Dependencies
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.passwordHistoryRepository = passwordHistoryRepository;
  }

  async execute(input: ChangePasswordInput): Promise<void> {
    // Validation
    if (!input.userId || input.userId.trim().length === 0) {
      throw new Error('Invalid user');
    }

    if (!input.currentPassword || input.currentPassword.trim().length === 0) {
      throw new Error('Invalid credentials');
    }

    if (!input.newPassword || input.newPassword.trim().length === 0) {
      throw new Error('Invalid password');
    }

    if (input.newPassword.trim().length < 6) {
      throw new Error('Password too short');
    }

    // Load user
    const user = await this.userRepository.findById(input.userId.trim());
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.getIsActive()) {
      throw new Error('User inactive');
    }

    // Verify current password
    const isValid = await this.passwordHasher.compare(
      input.currentPassword,
      user.getPasswordHash()
    );

    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Set new hash
    const newHash = await this.passwordHasher.hash(input.newPassword);

    // Check if password was used before
    const wasUsed = await this.passwordHistoryRepository.existsPasswordHash(input.userId, newHash);
    if (wasUsed) {
      throw new Error('Password already used');
    }

    // Save current password to history BEFORE changing
    const history = UserPasswordHistory.create({
      userId: input.userId,
      passwordHash: user.getPasswordHash(),
    });
    await this.passwordHistoryRepository.save(history);

    // Set new password
    user.changePasswordHash(newHash);

    // Persist
    await this.userRepository.update(user);
  }
}
