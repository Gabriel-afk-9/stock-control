import { IUserRepository } from '../../../users/domain/repositories/IUserRepository';
import { ICryptoService } from '../../domain/services/ICryptoService';
import { AuthUserDTO } from '../dtos/AuthUserDTO';
import { DomainError } from '@/core/errors/DomainError';

export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly cryptoService: ICryptoService
  ) {}

  async execute(email: string, password: string): Promise<AuthUserDTO> {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new DomainError('Credenciais inválidas.', 401);
    }

    const isPasswordValid = await this.cryptoService.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new DomainError('Credenciais inválidas.', 401);
    }

    return {
      id: user.id!,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}