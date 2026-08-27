import { describe, it, expect, vi } from 'vitest';
import { ListProductsUseCase } from './ListProductsUseCase';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';

function makeMocks() {
  const productRepository: IProductRepository = {
    findById: vi.fn(),
    findBySku: vi.fn(),
    findAll: vi.fn(),
    save: vi.fn(),
    delete: vi.fn(),
  };
  return { productRepository };
}

describe('ListProductsUseCase', () => {
  it('retorna ListProductsOutput com DTOs mapeados', async () => {
    const { productRepository } = makeMocks();
    const products = [
      new Product({ name: 'A', sku: 'A1', quantity: 5, price: 1, minStock: 10 }),
      new Product({ name: 'B', sku: 'B1', quantity: 50, price: 2, minStock: 10 }),
    ];
    vi.mocked(productRepository.findAll).mockResolvedValue(products);

    const useCase = new ListProductsUseCase(productRepository);
    const result = await useCase.execute();

    expect(result.products).toHaveLength(2);
    expect(result.products[0].sku).toBe('A1');
    expect(result.products[0].status).toBe('LOW_STOCK');
    expect(result.products[1].status).toBe('IN_STOCK');
  });

  it('retorna lista vazia quando não há produtos', async () => {
    const { productRepository } = makeMocks();
    vi.mocked(productRepository.findAll).mockResolvedValue([]);

    const useCase = new ListProductsUseCase(productRepository);
    const result = await useCase.execute();

    expect(result.products).toEqual([]);
  });
});
