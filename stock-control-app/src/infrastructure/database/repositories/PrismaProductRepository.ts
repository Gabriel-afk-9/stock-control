import { IProductRepository } from "../../../application/repositories/IProductRepository";
import { Product } from "../../../domain/entities/Product";
import { prisma } from "../prisma/client";

export class PrismaProductRepository implements IProductRepository {
  async findAll(): Promise<Product[]> {
    const data = await prisma.product.findMany({
      orderBy: { itemCode: 'asc' }
    });
    return data.map(p => new Product(p));
  }

  async findById(id: string): Promise<Product | null> {
    const data = await prisma.product.findUnique({ where: { id } });
    if (!data) return null;
    return new Product(data);
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }
}