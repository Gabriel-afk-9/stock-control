import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockUser } = vi.hoisted(() => ({
  mockUser: {
    findUnique: vi.fn(),
    upsert: vi.fn(),
  },
}));

vi.mock('@/core/database/prisma.client', () => ({
  prisma: { user: mockUser },
}));

import { PrismaUserRepository } from './PrismaUserRepository';
import { User, UserRole } from '@/shared/kernel';

describe('PrismaUserRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('findByEmail retorna null quando não encontra', async () => {
    mockUser.findUnique.mockResolvedValue(null);
    const repo = new PrismaUserRepository();

    const result = await repo.findByEmail('x@y.com');

    expect(result).toBeNull();
    expect(mockUser.findUnique).toHaveBeenCalledWith({ where: { email: 'x@y.com' } });
  });

  it('findByEmail mapeia password -> passwordHash e role', async () => {
    mockUser.findUnique.mockResolvedValue({
      id: 'u1',
      name: 'Chimbinha',
      email: 'a@b.com',
      password: 'hashed',
      role: 'ADMIN',
    });
    const repo = new PrismaUserRepository();

    const user = await repo.findByEmail('a@b.com');

    expect(user).toBeInstanceOf(User);
    expect(user?.passwordHash).toBe('hashed');
    expect(user?.role).toBe('ADMIN' as UserRole);
  });

  it('findById retorna usuário quando encontra', async () => {
    mockUser.findUnique.mockResolvedValue({
      id: 'u1',
      name: 'C',
      email: 'c@d.com',
      password: 'h',
      role: 'ALMOXARIFE',
    });
    const repo = new PrismaUserRepository();

    const user = await repo.findById('u1');

    expect(user?.id).toBe('u1');
    expect(mockUser.findUnique).toHaveBeenCalledWith({ where: { id: 'u1' } });
  });

  it('save faz upsert usando email como chave', async () => {
    mockUser.upsert.mockResolvedValue({});
    const repo = new PrismaUserRepository();
    const user = new User({
      id: 'u1',
      name: 'C',
      email: 'c@d.com',
      passwordHash: 'h',
      role: 'REQUISITOR' as UserRole,
    });

    await repo.save(user);

    expect(mockUser.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { email: 'c@d.com' },
        create: expect.objectContaining({ email: 'c@d.com', role: 'REQUISITOR' }),
        update: expect.objectContaining({ name: 'C' }),
      })
    );
  });
});
