import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';
import { SignJWT, jwtVerify } from 'jose';
import { AuthUserDTO } from '@/features/auth/application/dtos/AuthUserDTO';

const cookieStore = {
  set: vi.fn(),
  get: vi.fn(),
  delete: vi.fn(),
};

vi.stubEnv('JWT_SECRET', 'test-secret-min-32-chars-long-xxxxxxxxxxxx');
vi.mock('next/headers', () => ({
  cookies: vi.fn(() => cookieStore),
}));

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

let SessionService: typeof import('@/features/auth/infrastructure/session/session.service').SessionService;

beforeAll(async () => {
  ({ SessionService } = await import('@/features/auth/infrastructure/session/session.service'));
});

describe('SessionService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const user: AuthUserDTO = { id: 'u1', name: 'Ana', email: 'a@b.com', role: 'ADMIN' };

  it('createSession define cookie com token JWT válido', async () => {
    await SessionService.createSession(user);

    expect(cookieStore.set).toHaveBeenCalledTimes(1);
    const [name, token, opts] = cookieStore.set.mock.calls[0];
    expect(name).toBe('stock_control_session');
    expect(opts.httpOnly).toBe(true);
    expect(opts.sameSite).toBe('lax');

    const { payload } = await jwtVerify(token as string, JWT_SECRET, { algorithms: ['HS256'] });
    expect(payload.sub).toBe('u1');
    expect(payload.role).toBe('ADMIN');
    expect(payload.email).toBe('a@b.com');
  });

  it('getSession retorna null sem cookie', async () => {
    cookieStore.get.mockReturnValue(undefined);
    expect(await SessionService.getSession()).toBeNull();
  });

  it('getSession decodifica token válido', async () => {
    const token = await new SignJWT({ sub: 'u1', role: 'ALMOXARIFE', name: 'Bia', email: 'b@c.com' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(JWT_SECRET);

    cookieStore.get.mockReturnValue({ value: token });
    const result = await SessionService.getSession();
    expect(result).toEqual({ id: 'u1', role: 'ALMOXARIFE', name: 'Bia', email: 'b@c.com' });
  });

  it('getSession retorna null para token inválido', async () => {
    cookieStore.get.mockReturnValue({ value: 'token.invalido' });
    expect(await SessionService.getSession()).toBeNull();
  });

  it('destroySession deleta o cookie de sessão', async () => {
    await SessionService.destroySession();
    expect(cookieStore.delete).toHaveBeenCalledWith('stock_control_session');
  });
});
