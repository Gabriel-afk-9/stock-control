import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';
import { ProductMapper } from '../mappers/ProductMapper';
import { CreateProductInput, CreateProductOutput } from '../dtos/CreateProductDTO';

export class CreateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: CreateProductInput): Promise<CreateProductOutput> {
    const existingProduct = await this.productRepository.findBySku(input.sku);

    if (existingProduct) {
      throw new Error('Produto com este SKU já existe.');
    }

    const product = new Product({
      name: input.name,
      sku: input.sku,
      quantity: input.quantity,
      price: input.price,
      minStock: input.minStock ?? 10,
      maxStock: input.maxStock,
    });

    await this.productRepository.save(product);

    return {
      product: ProductMapper.toDTO(product),
    };
  }
}