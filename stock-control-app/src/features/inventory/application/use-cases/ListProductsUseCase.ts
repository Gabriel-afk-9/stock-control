import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { ProductMapper } from '../mappers/ProductMapper';
import { ListProductsInput, ListProductsOutput } from '../dtos/ListProductsDTO';

export class ListProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: ListProductsInput): Promise<ListProductsOutput> {
    const result = await this.productRepository.findPaginated(input);

    return {
      products: ProductMapper.toDTOList(result.products),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
    };
  }
}