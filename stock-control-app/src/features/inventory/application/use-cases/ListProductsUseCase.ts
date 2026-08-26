import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { ProductMapper } from '../mappers/ProductMapper';
import { ProductDTO } from '../dtos/ProductDTO';

export class ListProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(): Promise<ProductDTO[]> {
    const products = await this.productRepository.findAll();
    return ProductMapper.toDTOList(products);
  }
}