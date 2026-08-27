import { PrismaUserRepository } from '../../../users/infrastructure/database/PrismaUserRepository';
import { BcryptCryptoService } from '../../infrastructure/security/BcryptCryptoService';
import { LoginUseCase } from '../../application/use-cases/LoginUseCase';

export const makeLoginUseCase = (): LoginUseCase => {
  const userRepository = new PrismaUserRepository();
  const cryptoService = new BcryptCryptoService();
  return new LoginUseCase(userRepository, cryptoService);
};