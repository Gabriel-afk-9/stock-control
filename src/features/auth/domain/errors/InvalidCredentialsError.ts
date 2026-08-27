import { DomainError } from '@/core/errors/DomainError';

export class InvalidCredentialsError extends DomainError {
  constructor(message: string = 'Credenciais inválidas.') {
    super(message, 401);
    this.name = 'InvalidCredentialsError';
  }
}
