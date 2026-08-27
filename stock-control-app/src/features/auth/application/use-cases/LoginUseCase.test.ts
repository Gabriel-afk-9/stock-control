import { describe, it, expect, vi } from 'vitest';
import { LoginUseCase } from './LoginUseCase';
import { InvalidCredentialsError } from '../../domain/errors/InvalidCredentialsError';
import { IUserRepository } from '../../../users/domain/repositories/IUserRepository';
import { ICryptoService } from '../../domain/services/ICryptoService';
import { User, UserRole } from '@/shared/kernel';

function makeUser(overrides: Partial<User> = {}): User {
  return new User({
    id: 'user-1',
    name: 'Chimbinha',
    email: 'admin@estocai.com',
    passwordHash: 'hashed',
    role: 'ADMIN' as UserRole,
    ...overrides,
  });
}

function makeMocks() {
  const userRepository: IUserRepository = {
    findByEmail: vi.fn(),
    findById: vi.fn(),
    save: vi.fn(),
  };
  const cryptoService: ICryptoService = {
    hash: vi.fn(),
    compare: vi.fn(),
  };
  return { userRepository, cryptoService };
}

describe('LoginUseCase', () => {
  it('retorna LoginOutput com dados do usuário quando credenciais válidas', async () => {
    const { userRepository, cryptoService } = makeMocks();
    vi.mocked(userRepository.findByEmail).mockResolvedValue(makeUser());
    vi.mocked(cryptoService.compare).mockResolvedValue(true);

    const useCase = new LoginUseCase(userRepository, cryptoService);
    const result = await useCase.execute({ email: 'admin@estocai.com', password: 'secret' });

    expect(result.user.email).toBe('admin@estocai.com');
    expect(result.user.role).toBe('ADMIN');
    expect(cryptoService.compare).toHaveBeenCalledWith('secret', 'hashed');
  });

  it('lança InvalidCredentialsError quando usuário não existe', async () => {
    const { userRepository, cryptoService } = makeMocks();
    vi.mocked(userRepository.findByEmail).mockResolvedValue(null);

    const useCase = new LoginUseCase(userRepository, cryptoService);

    await expect(
      useCase.execute({ email: 'nao@existe.com', password: 'x' })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
    expect(cryptoService.compare).not.toHaveBeenCalled();
  });

  it('lança InvalidCredentialsError quando senha inválida', async () => {
    const { userRepository, cryptoService } = makeMocks();
    vi.mocked(userRepository.findByEmail).mockResolvedValue(makeUser());
    vi.mocked(cryptoService.compare).mockResolvedValue(false);

    const useCase = new LoginUseCase(userRepository, cryptoService);

    await expect(
      useCase.execute({ email: 'admin@estocai.com', password: 'errada' })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
