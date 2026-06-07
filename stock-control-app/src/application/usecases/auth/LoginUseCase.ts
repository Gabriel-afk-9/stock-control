import { IUserRepository } from "../../repositories/IUserRepository";
import { ICryptoService } from "../../services/ICryptoService";
import { DomainError } from "../../../domain/exceptions/DomainError";

export class LoginUseCase {
  constructor(
    private userRepository: IUserRepository,
    private cryptoService: ICryptoService
  ) {}

  async execute(email: string, passwordPlain: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user || !user.password) {
      throw new DomainError("E-mail ou senha incorretos");
    }

    const isPasswordValid = await this.cryptoService.compare(passwordPlain, user.password);

    if (!isPasswordValid) {
      throw new DomainError("E-mail ou senha incorretos");
    }

    return {
      id: user.id!,
      role: user.role,
      name: user.name,
    };
  }
}