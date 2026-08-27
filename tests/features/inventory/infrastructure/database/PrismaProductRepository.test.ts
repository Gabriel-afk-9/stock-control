import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockProduct } = vi.hoisted(() => ({
  mockProduct: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    count: vi.fn(),
    upsert: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('@/core/database/prisma.client', () => ({
  prisma: { product: mockProduct },
}));

import { PrismaProductRepository } from '@/features/inventory/infrastructure/database/PrismaProductRepository';
import { Product } from '@/features/inventory/domain/entities/Product';

describe('PrismaProductRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('findById retorna null quando não encontra', async () => {
    mockProduct.findUnique.mockResolvedValue(null);
    const repo = new PrismaProductRepository();

    const result = await repo.findById('x');

    expect(result).toBeNull();
    expect(mockProduct.findUnique).toHaveBeenCalledWith({ where: { id: 'x' } });
  });

  it('findById mapeia para Product do domínio', async () => {
    mockProduct.findUnique.mockResolvedValue({
      id: 'p1',
      name: 'Parafuso',
      sku: 'SKU-1',
      quantity: 5,
      price: { toString: () => '1.5' },
      minStock: 10,
      maxStock: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const repo = new PrismaProductRepository();

    const product = await repo.findById('p1');

    expect(product).toBeInstanceOf(Product);
    expect(product?.status).toBe('LOW_STOCK');
    expect(product?.maxStock).toBe(100);
  });

  it('findBySku consulta pelo sku', async () => {
    mockProduct.findUnique.mockResolvedValue(null);
    const repo = new PrismaProductRepository();

    await repo.findBySku('SKU-9');

    expect(mockProduct.findUnique).toHaveBeenCalledWith({ where: { sku: 'SKU-9' } });
  });

  it('save faz upsert com dados corretos', async () => {
    mockProduct.upsert.mockResolvedValue({});
    const repo = new PrismaProductRepository();
    const product = new Product({
      id: 'p1',
      name: 'A',
      sku: 'A1',
      quantity: 3,
      price: 2,
      minStock: 10,
      maxStock: 50,
    });

    await repo.save(product);

    expect(mockProduct.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'p1' },
        create: expect.objectContaining({ sku: 'A1', minStock: 10, maxStock: 50 }),
        update: expect.objectContaining({ sku: 'A1', minStock: 10, maxStock: 50 }),
      })
    );
  });

  it('delete remove pelo id', async () => {
    mockProduct.delete.mockResolvedValue({});
    const repo = new PrismaProductRepository();

    await repo.delete('p1');

    expect(mockProduct.delete).toHaveBeenCalledWith({ where: { id: 'p1' } });
  });

  it('findPaginated aplica where de busca, skip/take e count', async () => {
    mockProduct.findMany.mockResolvedValue([
      {
        id: 'p1',
        name: 'Parafuso',
        sku: 'SKU-1',
        quantity: 5,
        price: { toString: () => '1.5' },
        minStock: 10,
        maxStock: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    mockProduct.count.mockResolvedValue(21);

    const repo = new PrismaProductRepository();
    const result = await repo.findPaginated({ page: 2, pageSize: 10, search: 'par' });

    expect(mockProduct.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { OR: [{ name: { contains: 'par' } }, { sku: { contains: 'par' } }] },
        skip: 10,
        take: 10,
      })
    );
    expect(mockProduct.count).toHaveBeenCalledWith({
      where: { OR: [{ name: { contains: 'par' } }, { sku: { contains: 'par' } }] },
    });
    expect(result.total).toBe(21);
    expect(result.totalPages).toBe(3);
    expect(result.products).toHaveLength(1);
  });
});
