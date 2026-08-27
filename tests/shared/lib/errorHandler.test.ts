import { describe, it, expect, vi } from 'vitest';
import { handleActionError } from '@/shared/lib/errorHandler';
import { logger } from '@/shared/lib/logger';
import { InvalidCredentialsError } from '@/features/auth/domain/errors/InvalidCredentialsError';

vi.mock('@/shared/lib/logger', () => ({
  logger: { warn: vi.fn(), error: vi.fn() },
}));

describe('handleActionError', () => {
  it('retorna mensagem do DomainError e loga warn', () => {
    const err = new InvalidCredentialsError();
    const result = handleActionError(err, 'login');

    expect(result).toEqual({ success: false, message: err.message });
    expect(logger.warn).toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('retorna mensagem genérica e loga error para erro desconhecido', () => {
    const result = handleActionError(new Error('boom'), 'createProduct');

    expect(result.success).toBe(false);
    expect(result.message).toBe('Erro interno no servidor.');
    expect(logger.error).toHaveBeenCalled();
  });
});
