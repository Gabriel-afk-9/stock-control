import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { ProductNotFoundError } from '../../domain/errors/ProductNotFoundError';
import { DeleteProductInput, DeleteProductOutput } from '../dtos/DeleteProductDTO';

export class DeleteProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: DeleteProductInput): Promise<DeleteProductOutput> {
    const product = await this.productRepository.findById(input.productId);
    
    if (!product) {
      throw new ProductNotFoundError(input.productId);
    }

    await this.productRepository.delete(input.productId);
    
    return { success: true };
  }
}