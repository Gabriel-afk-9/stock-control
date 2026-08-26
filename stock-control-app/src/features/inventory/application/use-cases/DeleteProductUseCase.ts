import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { ProductNotFoundError } from '../../domain/errors/ProductNotFoundError';

export class DeleteProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(productId: string): Promise<void> {
    const product = await this.productRepository.findById(productId);
    
    if (!product) {
      throw new ProductNotFoundError(productId);
    }

    await this.productRepository.delete(productId);
  }
}