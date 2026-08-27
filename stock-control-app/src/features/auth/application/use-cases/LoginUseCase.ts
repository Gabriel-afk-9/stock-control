import { IUserRepository } from '../../../users/domain/repositories/IUserRepository';
import { ICryptoService } from '../../domain/services/ICryptoService';
import { LoginInput, LoginOutput } from '../dtos/LoginDTO';
import { InvalidCredentialsError } from '../../domain/errors/InvalidCredentialsError';

export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly cryptoService: ICryptoService
  ) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await this.cryptoService.compare(input.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    return {
      user: {
        id: user.id!,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}