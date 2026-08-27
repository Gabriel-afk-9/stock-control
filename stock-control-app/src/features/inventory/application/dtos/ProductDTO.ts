import { ProductStatus } from '../../domain/entities/Product';

export interface ProductDTO {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  minStock: number;
  maxStock?: number;
  status: ProductStatus;
  formattedPrice: string;
}