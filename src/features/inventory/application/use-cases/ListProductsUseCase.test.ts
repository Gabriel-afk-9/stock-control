import { describe, it, expect, vi } from 'vitest';
import { ListProductsUseCase } from './ListProductsUseCase';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';

function makeMocks() {
  const productRepository: IProductRepository = {
    findById: vi.fn(),
    findBySku: vi.fn(),
    findAll: vi.fn(),
    findPaginated: vi.fn(),
    save: vi.fn(),
    delete: vi.fn(),
  };
  return { productRepository };
}

describe('ListProductsUseCase', () => {
  it('retorna ListProductsOutput com DTOs mapeados e metadados de paginação', async () => {
    const { productRepository } = makeMocks();
    const products = [
      new Product({ name: 'A', sku: 'A1', quantity: 5, price: 1, minStock: 10 }),
      new Product({ name: 'B', sku: 'B1', quantity: 50, price: 2, minStock: 10 }),
    ];
    vi.mocked(productRepository.findPaginated).mockResolvedValue({
      products,
      total: 2,
      page: 1,
      pageSize: 10,
      totalPages: 1,
    });

    const useCase = new ListProductsUseCase(productRepository);
    const result = await useCase.execute({ page: 1, search: 'A' });

    expect(result.products).toHaveLength(2);
    expect(result.products[0].sku).toBe('A1');
    expect(result.products[0].status).toBe('LOW_STOCK');
    expect(result.products[1].status).toBe('IN_STOCK');
    expect(result.total).toBe(2);
    expect(result.totalPages).toBe(1);
    expect(productRepository.findPaginated).toHaveBeenCalledWith(
      expect.objectContaining({ page: 1, search: 'A' })
    );
  });

  it('retorna lista vazia quando não há produtos', async () => {
    const { productRepository } = makeMocks();
    vi.mocked(productRepository.findPaginated).mockResolvedValue({
      products: [],
      total: 0,
      page: 1,
      pageSize: 10,
      totalPages: 0,
    });

    const useCase = new ListProductsUseCase(productRepository);
    const result = await useCase.execute({});

    expect(result.products).toEqual([]);
    expect(result.totalPages).toBe(0);
  });
});
