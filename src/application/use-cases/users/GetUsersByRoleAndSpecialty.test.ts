import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetUsersByRoleAndSpecialty } from './GetUsersByRoleAndSpecialty';
import { UserRole, UserSpecialty } from '@/domain/enums/';

describe('GetUsersByRoleAndSpecialty Use Case', () => {
  // Creamos el mock del repositorio
  const mockUserRepository = {
    findByRoleAndSpecialty: vi.fn(),
    // Agregamos otros métodos vacíos si la interfaz lo requiere
    findById: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    findByEmail: vi.fn(),
  };

  const useCase = new GetUsersByRoleAndSpecialty(mockUserRepository as any);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a list of users from the repository based on role and specialty', async () => {
    // Datos de prueba (Mocks de Entidades)
    const mockUsers = [
      { id: '1', getName: () => 'Dr. House' },
      { id: '2', getName: () => 'Dr. Strange' },
    ];

    // Configuramos el comportamiento del mock
    mockUserRepository.findByRoleAndSpecialty.mockResolvedValue(mockUsers);

    const role = UserRole.DOCTOR;
    const specialty = UserSpecialty.WEIGHT;

    // Ejecución
    const result = await useCase.execute(role, specialty);

    // Verificaciones (Assertions)
    expect(mockUserRepository.findByRoleAndSpecialty).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findByRoleAndSpecialty).toHaveBeenCalledWith(role, specialty);
    expect(result).toEqual(mockUsers);
    expect(result.length).toBe(2);
  });

  it('should return an empty array if no users are found', async () => {
    mockUserRepository.findByRoleAndSpecialty.mockResolvedValue([]);

    const result = await useCase.execute(UserRole.DOCTOR, UserSpecialty.WEIGHT);

    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });

  it('should throw an error if the repository fails', async () => {
    mockUserRepository.findByRoleAndSpecialty.mockRejectedValue(
      new Error('Database connection error')
    );

    await expect(useCase.execute(UserRole.DOCTOR, UserSpecialty.WEIGHT)).rejects.toThrow(
      'Database connection error'
    );
  });
});
