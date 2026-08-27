import { prisma } from '@/core/database/prisma.client';
import { IProductRepository, ProductQuery, ProductPaginationResult } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';

export class PrismaProductRepository implements IProductRepository {
  async findById(id: string): Promise<Product | null> {
    const data = await prisma.product.findUnique({ where: { id } });

    if (!data) return null;

    return this.toDomain(data);
  }

  async findBySku(sku: string): Promise<Product | null> {
    const data = await prisma.product.findUnique({ where: { sku } });

    if (!data) return null;

    return this.toDomain(data);
  }

  async findAll(): Promise<Product[]> {
    const products = await prisma.product.findMany();

    return products.map((p) => this.toDomain(p));
  }

  async findPaginated(query: ProductQuery): Promise<ProductPaginationResult> {
    const page = Math.max(1, query.page ?? 1);
    const pageSize = Math.max(1, Math.min(query.pageSize ?? 10, 100));
    const search = query.search?.trim();

    const where = search
      ? { OR: [{ name: { contains: search } }, { sku: { contains: search } }] }
      : {};

    const [rows, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { name: 'asc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.product.count({ where }),
    ]);

    let products = rows.map((p) => this.toDomain(p));

    // Filtro de status é aplicado em memória porque o status é derivado no
    // domínio (não persistido). Para grandes volumes, usar coluna computada no
    // Postgres. Aqui filtramos apenas a fatia já paginada.
    if (query.status) {
      products = products.filter((p) => p.status === query.status);
    }

    const totalPages = Math.ceil(total / pageSize);

    return { products, total, page, pageSize, totalPages };
  }

  async save(product: Product): Promise<void> {
    await prisma.product.upsert({
      where: { id: product.id || '' },
      update: {
        name: product.name,
        sku: product.sku,
        quantity: product.quantity,
        price: product.price,
        minStock: product.minStock,
        maxStock: product.maxStock,
      },
      create: {
        name: product.name,
        sku: product.sku,
        quantity: product.quantity,
        price: product.price,
        minStock: product.minStock,
        maxStock: product.maxStock,
      }
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }

  private toDomain(data: {
    id: string;
    name: string;
    sku: string;
    quantity: number;
    price: unknown;
    minStock: number;
    maxStock: number | null;
    createdAt: Date;
    updatedAt: Date;
  }): Product {
    return new Product({
      id: data.id,
      name: data.name,
      sku: data.sku,
      quantity: data.quantity,
      price: Number(data.price),
      minStock: data.minStock,
      maxStock: data.maxStock ?? undefined,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}