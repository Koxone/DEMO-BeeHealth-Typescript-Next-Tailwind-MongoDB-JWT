import { User } from '@/domain/entities/user/User';
import { Email } from '@/domain/value-objects/Email';
import { UserRole, UserSpecialty } from '@/domain/enums/';
import { UserRepository } from '@/domain/repositories/user/UserRepository';
import { PasswordHasher } from '@/domain/services/auth/PasswordHasher';

//? This  is the data needed to register a new user
interface RegisterUserInput {
  email: string;
  password: string;
  name: string;
  lastName: string;
  role: UserRole;
  phone: string;
  specialty: UserSpecialty;
}

export class RegisterUser {
  private userRepository: UserRepository;
  private passwordHasher: PasswordHasher;

  constructor(userRepository: UserRepository, passwordHasher: PasswordHasher) {
    // Dependencies needed in order to register a user
    this.userRepository = userRepository; //
    this.passwordHasher = passwordHasher;
  }

  async execute(input: RegisterUserInput): Promise<User> {
    // Validation
    if (!input.name || input.name.trim().length === 0) {
      throw new Error('Invalid name');
    }

    if (!input.lastName || input.lastName.trim().length === 0) {
      throw new Error('Invalid last name');
    }

    if (!input.phone || input.phone.trim().length === 0) {
      throw new Error('Invalid phone');
    }

    if (!/^[0-9]{7,15}$/.test(input.phone.trim())) {
      throw new Error('Invalid phone');
    }

    if (!input.password || input.password.trim().length === 0) {
      throw new Error('Invalid password');
    }

    // Value object
    const email = Email.create(input.email);

    // Uniqueness
    const emailExists = await this.userRepository.existsByEmail(email.getValue());
    if (emailExists) {
      throw new Error('Email already in use');
    }

    const phoneUser = await this.userRepository.findByPhone(input.phone.trim());
    if (phoneUser) {
      throw new Error('Phone already in use');
    }

    // Hash password
    const passwordHash = await this.passwordHasher.hash(input.password);

    // Create domain entity (NO id here)
    const user = User.create({
      email,
      name: input.name.trim(),
      lastName: input.lastName.trim(),
      phone: input.phone.trim(),
      passwordHash,
      role: input.role,
      specialty: input.specialty,
    });

    // Persist (Mongo creates _id)
    await this.userRepository.save(user);

    return user;
  }
}
