import { describe, it, expect } from 'vitest';
import { Product } from '@/features/inventory/domain/entities/Product';

function makeProduct(overrides: Partial<ConstructorParameters<typeof Product>[0]> = {}) {
  return new Product({
    name: 'Parafuso',
    sku: 'PAR-001',
    quantity: 50,
    price: 1.5,
    minStock: 10,
    ...overrides,
  });
}

describe('Product', () => {
  describe('status (derivado do domínio)', () => {
    it('retorna OUT_OF_STOCK quando quantity <= 0', () => {
      const product = makeProduct({ quantity: 0 });
      expect(product.status).toBe('OUT_OF_STOCK');
    });

    it('retorna LOW_STOCK quando 0 < quantity < minStock', () => {
      const product = makeProduct({ quantity: 5, minStock: 10 });
      expect(product.status).toBe('LOW_STOCK');
    });

    it('retorna IN_STOCK quando quantity >= minStock', () => {
      const product = makeProduct({ quantity: 10, minStock: 10 });
      expect(product.status).toBe('IN_STOCK');
    });

    it('usa minStock para o limite de LOW_STOCK', () => {
      const product = makeProduct({ quantity: 9, minStock: 10 });
      expect(product.status).toBe('LOW_STOCK');
    });
  });

  describe('isLowStock', () => {
    it('true quando abaixo do mínimo mas acima de zero', () => {
      expect(makeProduct({ quantity: 5, minStock: 10 }).isLowStock()).toBe(true);
    });

    it('false quando em estoque', () => {
      expect(makeProduct({ quantity: 20, minStock: 10 }).isLowStock()).toBe(false);
    });

    it('false quando zerado', () => {
      expect(makeProduct({ quantity: 0, minStock: 10 }).isLowStock()).toBe(false);
    });
  });

  describe('isOutOfStock', () => {
    it('true quando quantity é zero', () => {
      expect(makeProduct({ quantity: 0 }).isOutOfStock()).toBe(true);
    });

    it('false quando há estoque', () => {
      expect(makeProduct({ quantity: 1 }).isOutOfStock()).toBe(false);
    });
  });

  describe('propriedades', () => {
    it('mantém maxStock opcional', () => {
      const product = makeProduct({ maxStock: 100 });
      expect(product.maxStock).toBe(100);
    });

    it('permite maxStock indefinido', () => {
      const product = makeProduct();
      expect(product.maxStock).toBeUndefined();
    });
  });
});
