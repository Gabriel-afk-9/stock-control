import { PrismaProductRepository } from '../../infrastructure/database/PrismaProductRepository';
import { CreateProductUseCase } from '../../application/use-cases/CreateProductUseCase';

export const makeCreateProductUseCase = (): CreateProductUseCase => {
  const repository = new PrismaProductRepository();
  return new CreateProductUseCase(repository);
};