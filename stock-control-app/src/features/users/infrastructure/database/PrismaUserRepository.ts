import { prisma } from '@/core/database/prisma.client';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User, UserRole } from '../../domain/entities/User';

export class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const data = await prisma.user.findUnique({ where: { email } });
    if (!data) return null;

    return new User({
      id: data.id,
      name: data.name,
      email: data.email,
      passwordHash: data.password, // O Prisma schema geralmente chama de 'password'
      role: data.role as UserRole,
    });
  }

  async save(user: User): Promise<void> {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        password: user.passwordHash,
        role: user.role,
      },
      create: {
        name: user.name,
        email: user.email,
        password: user.passwordHash,
        role: user.role,
      }
    });
  }
}