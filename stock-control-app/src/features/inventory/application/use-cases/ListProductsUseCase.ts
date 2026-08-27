import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { ProductMapper } from '../mappers/ProductMapper';
import { ListProductsOutput } from '../dtos/ListProductsDTO';

export class ListProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(): Promise<ListProductsOutput> {
    const products = await this.productRepository.findAll();
    return {
      products: ProductMapper.toDTOList(products),
    };
  }
}