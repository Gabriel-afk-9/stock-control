import { describe, it, expect, vi, beforeEach } from 'vitest';

const mocks = vi.hoisted(() => ({
  mockRedirect: vi.fn(),
  mockCookies: vi.fn(() => ({ set: vi.fn(), delete: vi.fn(), get: vi.fn() })),
  mockLoginUseCase: { execute: vi.fn() },
  mockCreateSession: vi.fn(),
  mockRateLimit: { check: vi.fn() },
}));

vi.mock('next/navigation', () => ({
  redirect: (...args: any[]) => (mocks.mockRedirect as any)(...args),
}));

vi.mock('next/headers', () => ({
  cookies: (...args: any[]) => (mocks.mockCookies as any)(...args),
}));

vi.mock('@/features/auth/main/factories/makeLoginUseCase', () => ({
  makeLoginUseCase: () => mocks.mockLoginUseCase,
}));

vi.mock('@/features/auth/infrastructure/session/session.service', () => ({
  SessionService: {
    createSession: (...args: any[]) => (mocks.mockCreateSession as any)(...args),
    destroySession: vi.fn(),
    getSession: vi.fn(),
  },
}));

vi.mock('@/shared/lib/rate-limit', () => ({
  rateLimit: mocks.mockRateLimit,
}));

import { loginAction } from './auth.actions';
import { InvalidCredentialsError } from '../../domain/errors/InvalidCredentialsError';

function formData(email: string, password: string) {
  const fd = new FormData();
  fd.set('email', email);
  fd.set('password', password);
  return fd;
}

describe('loginAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.mockRateLimit.check.mockResolvedValue({ success: true });
  });

  it('retorna erro quando validação Zod falha (email inválido)', async () => {
    const result = await loginAction(null, formData('invalid', '123'));

    expect(result).toEqual({ success: false, error: 'E-mail inválido' });
    expect(mocks.mockLoginUseCase.execute).not.toHaveBeenCalled();
  });

  it('retorna erro quando rate limit excedido', async () => {
    mocks.mockRateLimit.check.mockResolvedValue({ success: false });

    const result = await loginAction(null, formData('a@b.com', '123'));

    expect(result).toEqual({
      success: false,
      error: 'Muitas tentativas. Tente novamente em 1 minuto.',
    });
  });

  it('retorna erro de credenciais inválidas tratadas', async () => {
    mocks.mockLoginUseCase.execute.mockRejectedValue(new InvalidCredentialsError());

    const result = await loginAction(null, formData('a@b.com', 'wrong'));

    expect(result).toEqual({ success: false, error: 'Credenciais inválidas.' });
    expect(mocks.mockCreateSession).not.toHaveBeenCalled();
  });

  it('cria sessão e redireciona em credenciais válidas', async () => {
    mocks.mockLoginUseCase.execute.mockResolvedValue({
      user: { id: 'u1', name: 'C', email: 'a@b.com', role: 'ADMIN' },
    });

    await loginAction(null, formData('a@b.com', 'right'));

    expect(mocks.mockCreateSession).toHaveBeenCalledWith({
      id: 'u1',
      name: 'C',
      email: 'a@b.com',
      role: 'ADMIN',
    });
    expect(mocks.mockRedirect).toHaveBeenCalledWith('/dashboard/inventory');
  });
});
