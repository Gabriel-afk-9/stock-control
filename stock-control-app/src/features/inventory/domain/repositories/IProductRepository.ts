import { Product } from '../entities/Product';
import { ProductStatus } from '../entities/Product';

export interface ProductQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: ProductStatus;
}

export interface ProductPaginationResult {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  findBySku(sku: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  findPaginated(query: ProductQuery): Promise<ProductPaginationResult>;
  save(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
}