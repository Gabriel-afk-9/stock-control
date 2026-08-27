import { describe, it, expect, vi } from 'vitest';
import { CreateProductUseCase } from './CreateProductUseCase';
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

describe('CreateProductUseCase', () => {
  it('lança erro quando já existe produto com o mesmo SKU', async () => {
    const { productRepository } = makeMocks();
    vi.mocked(productRepository.findBySku).mockResolvedValue(
      new Product({ name: 'A', sku: 'A1', quantity: 1, price: 1, minStock: 10 })
    );

    const useCase = new CreateProductUseCase(productRepository);

    await expect(
      useCase.execute({ name: 'Novo', sku: 'A1', quantity: 5, price: 2 })
    ).rejects.toThrow('Produto com este SKU já existe.');
    expect(productRepository.save).not.toHaveBeenCalled();
  });

  it('cria produto com minStock padrão (10) quando não informado', async () => {
    const { productRepository } = makeMocks();
    vi.mocked(productRepository.findById).mockResolvedValue(null);
    vi.mocked(productRepository.save).mockResolvedValue(undefined);

    const useCase = new CreateProductUseCase(productRepository);
    const result = await useCase.execute({ name: 'Novo', sku: 'NEW-1', quantity: 5, price: 2 });

    expect(result.product.name).toBe('Novo');
    expect(result.product.minStock).toBe(10);
    expect(productRepository.save).toHaveBeenCalledOnce();
    const saved = vi.mocked(productRepository.save).mock.calls[0][0] as Product;
    expect(saved.minStock).toBe(10);
  });

  it('cria produto respeitando minStock/maxStock informados', async () => {
    const { productRepository } = makeMocks();
    vi.mocked(productRepository.findById).mockResolvedValue(null);

    const useCase = new CreateProductUseCase(productRepository);
    const result = await useCase.execute({
      name: 'Novo',
      sku: 'NEW-2',
      quantity: 100,
      price: 3,
      minStock: 20,
      maxStock: 200,
    });

    expect(result.product.minStock).toBe(20);
    expect(result.product.maxStock).toBe(200);
    const saved = vi.mocked(productRepository.save).mock.calls[0][0] as Product;
    expect(saved.maxStock).toBe(200);
  });
});
