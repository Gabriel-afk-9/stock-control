import { prisma } from '@/core/database/prisma.client';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product, ProductStatus } from '../../domain/entities/Product';

export class PrismaProductRepository implements IProductRepository {
  async findById(id: string): Promise<Product | null> {
    const data = await prisma.product.findUnique({ where: { id } });
    
    if (!data) return null;
    
    return new Product({
      id: data.id,
      name: data.name,
      sku: data.sku,
      quantity: data.quantity,
      price: Number(data.price),
      status: data.status as ProductStatus,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  async findAll(): Promise<Product[]> {
    const products = await prisma.product.findMany();
    
    return products.map(p => new Product({
      id: p.id,
      name: p.name,
      sku: p.sku,
      quantity: p.quantity,
      price: Number(p.price),
      status: p.status as ProductStatus,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));
  }

  async save(product: Product): Promise<void> {
    await prisma.product.upsert({
      where: { id: product.id || '' },
      update: {
        name: product.name,
        sku: product.sku,
        quantity: product.quantity,
        price: product.price,
        status: product.status,
      },
      create: {
        name: product.name,
        sku: product.sku,
        quantity: product.quantity,
        price: product.price,
        status: product.status,
      }
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }
}