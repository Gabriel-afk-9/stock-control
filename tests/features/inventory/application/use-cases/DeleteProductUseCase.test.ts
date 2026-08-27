import { describe, it, expect, vi } from 'vitest';
import { DeleteProductUseCase } from '@/features/inventory/application/use-cases/DeleteProductUseCase';
import { IProductRepository } from '@/features/inventory/domain/repositories/IProductRepository';
import { ProductNotFoundError } from '@/features/inventory/domain/errors/ProductNotFoundError';
import { Product } from '@/features/inventory/domain/entities/Product';

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

describe('DeleteProductUseCase', () => {
  it('lança ProductNotFoundError quando produto não existe', async () => {
    const { productRepository } = makeMocks();
    vi.mocked(productRepository.findById).mockResolvedValue(null);

    const useCase = new DeleteProductUseCase(productRepository);

    await expect(useCase.execute({ productId: 'nope' })).rejects.toBeInstanceOf(ProductNotFoundError);
    expect(productRepository.delete).not.toHaveBeenCalled();
  });

  it('deleta o produto quando existe e retorna success', async () => {
    const { productRepository } = makeMocks();
    vi.mocked(productRepository.findById).mockResolvedValue(
      new Product({ name: 'A', sku: 'A1', quantity: 1, price: 1, minStock: 10 })
    );

    const useCase = new DeleteProductUseCase(productRepository);
    const result = await useCase.execute({ productId: 'prod-1' });

    expect(result.success).toBe(true);
    expect(productRepository.delete).toHaveBeenCalledWith('prod-1');
  });
});
