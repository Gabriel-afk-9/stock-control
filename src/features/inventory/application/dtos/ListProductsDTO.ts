import { ProductDTO } from './ProductDTO';
import { ProductStatus } from '../../domain/entities/Product';

export interface ListProductsInput {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: ProductStatus;
}

export interface ListProductsOutput {
  products: ProductDTO[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}