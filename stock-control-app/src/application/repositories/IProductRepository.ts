import { Product } from "../../domain/entities/Product";

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  delete(id: string): Promise<void>;
}