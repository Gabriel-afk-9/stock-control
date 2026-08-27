import { describe, it, expect } from 'vitest';
import { ProductNotFoundError } from '@/features/inventory/domain/errors/ProductNotFoundError';

describe('ProductNotFoundError', () => {
  it('é uma instância de Error', () => {
    expect(new ProductNotFoundError('abc')).toBeInstanceOf(Error);
  });

  it('inclui o id na mensagem', () => {
    const error = new ProductNotFoundError('prod-123');
    expect(error.message).toContain('prod-123');
    expect(error.name).toBe('ProductNotFoundError');
  });
});
