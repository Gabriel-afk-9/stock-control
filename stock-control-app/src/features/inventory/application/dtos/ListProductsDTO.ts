import { ProductDTO } from './ProductDTO';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListProductsInput {
  // Future: pagination, filters
}

export interface ListProductsOutput {
  products: ProductDTO[];
}