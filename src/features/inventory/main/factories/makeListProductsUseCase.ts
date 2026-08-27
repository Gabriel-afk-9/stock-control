import { PrismaProductRepository } from '../../infrastructure/database/PrismaProductRepository';
import { ListProductsUseCase } from '../../application/use-cases/ListProductsUseCase';

export const makeListProductsUseCase = (): ListProductsUseCase => {
  // A injeção de dependência acontece aqui.
  const repository = new PrismaProductRepository();
  return new ListProductsUseCase(repository);
};