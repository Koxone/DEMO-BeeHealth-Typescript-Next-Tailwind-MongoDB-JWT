import { describe, it, expect, vi } from 'vitest';
import { User } from './User';
import { Email } from '@/domain/value-objects/Email';
import { UserSpecialty, UserRole } from '@/domain/enums/';

describe('User Entity', () => {
  const validEmail = Email.create('test@beehealth.com');
  const validUserProps = {
    email: validEmail,
    name: 'John',
    lastName: 'Doe',
    passwordHash: 'hashed_password',
    role: UserRole.DOCTOR,
    phone: '1234567890',
    specialty: UserSpecialty.WEIGHT,
  };

  describe('create', () => {
    it('should create a new user instance with valid props', () => {
      const user = User.create(validUserProps);

      expect(user.getName()).toBe('John');
      expect(user.getIsActive()).toBe(true);
      expect(user.getId()).toBe('');
      expect(user.getCreatedAt()).toBeInstanceOf(Date);
    });

    it('should trim name and last name', () => {
      const user = User.create({
        ...validUserProps,
        name: '  John  ',
        lastName: '  Doe  ',
      });

      expect(user.getName()).toBe('John');
      expect(user.getLastName()).toBe('Doe');
    });

    it('should throw error if name is empty', () => {
      expect(() => User.create({ ...validUserProps, name: '' })).toThrow('Invalid name');
    });

    it('should throw error if role is invalid', () => {
      expect(() => User.create({ ...validUserProps, role: 'INVALID_ROLE' as any })).toThrow(
        'Invalid role'
      );
    });
  });

  describe('fromPersistence', () => {
    it('should rehydrate a user from persistence data', () => {
      const date = new Date();
      const user = User.fromPersistence({
        id: 'user_123',
        ...validUserProps,
        avatar: null,
        isActive: true,
        createdAt: date,
        updatedAt: date,
      });

      expect(user.getId()).toBe('user_123');
      expect(user.getCreatedAt()).toBe(date);
    });

    it('should throw error if id is missing', () => {
      expect(() => User.fromPersistence({ id: '', ...validUserProps } as any)).toThrow(
        'Invalid id'
      );
    });
  });

  describe('behavior', () => {
    it('should change password hash and update updatedAt date', () => {
      const user = User.create(validUserProps);
      const oldUpdatedAt = user.getUpdatedAt();

      // Mock timers if you want to be precise with time
      vi.useFakeTimers();
      vi.advanceTimersByTime(1000);

      user.changePasswordHash('new_hash');

      expect(user.getPasswordHash()).toBe('new_hash');
      expect(user.getUpdatedAt().getTime()).toBeGreaterThan(oldUpdatedAt.getTime());

      vi.useRealTimers();
    });

    it('should deactivate the user', () => {
      const user = User.create(validUserProps);
      user.deactivate();

      expect(user.getIsActive()).toBe(false);
    });

    it('should return full name correctly', () => {
      const user = User.create(validUserProps);
      expect(user.getFullName()).toBe('John Doe');
    });

    it('should change specialty if valid', () => {
      const user = User.create(validUserProps);
      user.changeSpecialty(UserSpecialty.WEIGHT);
      expect(user.getSpecialty()).toBe(UserSpecialty.WEIGHT);
    });
  });
});
