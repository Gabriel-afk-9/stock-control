import { describe, it, expect, vi, beforeEach } from 'vitest';

const mocks = vi.hoisted(() => ({
  mockRevalidatePath: vi.fn(),
  mockRequireRole: vi.fn(),
  mockDeleteUseCase: { execute: vi.fn() },
  mockCreateUseCase: { execute: vi.fn() },
}));

vi.mock('next/cache', () => ({
  revalidatePath: (...args: any[]) => (mocks.mockRevalidatePath as any)(...args),
}));

vi.mock('@/features/auth/presentation/guards/auth.guards', () => ({
  requireRole: (...args: any[]) => (mocks.mockRequireRole as any)(...args),
}));

vi.mock('@/features/inventory/main/factories/makeDeleteProductUseCase', () => ({
  makeDeleteProductUseCase: () => mocks.mockDeleteUseCase,
}));

vi.mock('@/features/inventory/main/factories/makeCreateProductUseCase', () => ({
  makeCreateProductUseCase: () => mocks.mockCreateUseCase,
}));

import { deleteProductAction, createProductAction } from '@/features/inventory/presentation/actions/inventory.actions';
import { DomainError } from '@/core/errors/DomainError';
import { ProductNotFoundError } from '@/features/inventory/domain/errors/ProductNotFoundError';

describe('deleteProductAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.mockRequireRole.mockResolvedValue(undefined);
  });

  it('bloqueia quando requireRole falha', async () => {
    mocks.mockRequireRole.mockRejectedValue(new Error('Forbidden'));

    await expect(deleteProductAction('p1')).rejects.toThrow('Forbidden');
  });

  it('retorna erro quando productId inválido (Zod)', async () => {
    const result = await deleteProductAction('not-a-uuid');

    expect(result).toEqual({
      success: false,
      message: 'ID do produto inválido',
    });
    expect(mocks.mockDeleteUseCase.execute).not.toHaveBeenCalled();
  });

  it('retorna sucesso e revalida em caso de exclusão', async () => {
    mocks.mockDeleteUseCase.execute.mockResolvedValue({ success: true });

    const result = await deleteProductAction('123e4567-e89b-12d3-a456-426614174000');

    expect(result).toEqual({ success: true });
    expect(mocks.mockRevalidatePath).toHaveBeenCalledWith('/dashboard/inventory');
  });

  it('propaga mensagem de ProductNotFoundError', async () => {
    mocks.mockDeleteUseCase.execute.mockRejectedValue(new ProductNotFoundError('p1'));

    const result = await deleteProductAction('123e4567-e89b-12d3-a456-426614174000');

    expect(result).toEqual({
      success: false,
      message: expect.stringContaining('p1'),
    });
  });

  it('propaga mensagem de DomainError', async () => {
    mocks.mockDeleteUseCase.execute.mockRejectedValue(new DomainError('Falha', 400));

    const result = await deleteProductAction('123e4567-e89b-12d3-a456-426614174000');

    expect(result).toEqual({ success: false, message: 'Falha' });
  });
});

describe('createProductAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.mockRequireRole.mockResolvedValue(undefined);
  });

  function formData() {
    const fd = new FormData();
    fd.set('name', 'Novo');
    fd.set('sku', 'NEW-1');
    fd.set('quantity', '5');
    fd.set('price', '2');
    return fd;
  }

  it('retorna erro quando validação falha', async () => {
    const fd = new FormData();
    fd.set('name', '');
    fd.set('sku', 'X');
    fd.set('quantity', '5');
    fd.set('price', '2');

    const result = await createProductAction(fd);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Nome é obrigatório');
    expect(mocks.mockCreateUseCase.execute).not.toHaveBeenCalled();
  });

  it('cria produto e revalida em sucesso', async () => {
    mocks.mockCreateUseCase.execute.mockResolvedValue({ product: { id: '1', name: 'Novo' } });

    const result = await createProductAction(formData());

    expect(result.success).toBe(true);
    expect(mocks.mockRevalidatePath).toHaveBeenCalledWith('/dashboard/inventory');
  });
});
