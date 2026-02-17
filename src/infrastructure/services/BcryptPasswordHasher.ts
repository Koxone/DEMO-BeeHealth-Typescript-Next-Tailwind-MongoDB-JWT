import bcrypt from 'bcryptjs';
import { PasswordHasher } from '@/domain/services/auth/PasswordHasher';

export class BcryptPasswordHasher implements PasswordHasher {
  async hash(value: string): Promise<string> {
    // Hash
    const saltRounds = 10;
    return bcrypt.hash(value, saltRounds);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    // Compare
    return bcrypt.compare(value, hash);
  }
}
