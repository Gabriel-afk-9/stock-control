import { IUserRepository } from "../../../application/repositories/IUserRepository";
import { User, UserRole } from "../../../domain/entities/User";
import { prisma } from "../prisma/client";

export class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const data = await prisma.user.findUnique({ where: { email } });
    if (!data) return null;
    return new User({
      id: data.id,
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role as UserRole
    });
  }
}