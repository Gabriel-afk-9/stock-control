import { PrismaProductRepository } from '../../infrastructure/database/PrismaProductRepository';
import { DeleteProductUseCase } from '../../application/use-cases/DeleteProductUseCase';

export const makeDeleteProductUseCase = (): DeleteProductUseCase => {
  const repository = new PrismaProductRepository();
  return new DeleteProductUseCase(repository);
};