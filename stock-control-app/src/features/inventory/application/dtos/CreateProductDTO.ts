import { ProductDTO } from './ProductDTO';

export interface CreateProductInput {
  name: string;
  sku: string;
  quantity: number;
  price: number;
  minStock?: number;
  maxStock?: number;
}

export interface CreateProductOutput {
  product: ProductDTO;
}