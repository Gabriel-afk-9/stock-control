import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockGetSession = vi.fn();
vi.mock('@/features/auth/infrastructure/session/session.service', () => ({
  SessionService: {
    getSession: (...args: any[]) => (mockGetSession as any)(...args),
  },
}));

const mockRedirect = vi.fn((url: string) => {
  throw new Error(`__REDIRECT__:${url}`);
});
vi.mock('next/navigation', () => ({
  redirect: (...args: any[]) => (mockRedirect as any)(...args),
}));

import { requireSession, requireRole, getOptionalSession } from '@/features/auth/presentation/guards/auth.guards';
import { AuthUserDTO } from '@/features/auth/application/dtos/AuthUserDTO';

const user: AuthUserDTO = { id: 'u1', name: 'Ana', email: 'a@b.com', role: 'ADMIN' };

describe('auth guards', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('requireSession redireciona para /login quando não há sessão', async () => {
    mockGetSession.mockResolvedValue(null);
    await expect(requireSession()).rejects.toThrow('__REDIRECT__:/login');
    expect(mockRedirect).toHaveBeenCalledWith('/login');
  });

  it('requireSession retorna o usuário quando há sessão', async () => {
    mockGetSession.mockResolvedValue(user);
    await expect(requireSession()).resolves.toEqual(user);
  });

  it('requireRole redireciona quando o papel não é permitido', async () => {
    mockGetSession.mockResolvedValue(user);
    await expect(requireRole(['ALMOXARIFE'])).rejects.toThrow(
      '__REDIRECT__:/dashboard?error=unauthorized',
    );
  });

  it('requireRole retorna o usuário quando o papel é permitido', async () => {
    mockGetSession.mockResolvedValue(user);
    await expect(requireRole(['ADMIN'])).resolves.toEqual(user);
  });

  it('getOptionalSession delega para SessionService.getSession', async () => {
    mockGetSession.mockResolvedValue(user);
    expect(await getOptionalSession()).toEqual(user);
  });
});
