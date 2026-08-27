import { DomainError } from '@/core/errors/DomainError';

export class ProductNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Produto com ID ${id} não foi encontrado.`, 404);
    this.name = 'ProductNotFoundError';
  }
}