export type ProductStatus = 'IN_STOCK' | 'OUT_OF_STOCK' | 'LOW_STOCK';

export interface ProductProps {
  id?: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  minStock: number;
  maxStock?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product {
  public readonly id?: string;
  public readonly name: string;
  public readonly sku: string;
  public readonly quantity: number;
  public readonly price: number;
  public readonly minStock: number;
  public readonly maxStock?: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: ProductProps) {
    this.id = props.id;
    this.name = props.name;
    this.sku = props.sku;
    this.quantity = props.quantity;
    this.price = props.price;
    this.minStock = props.minStock;
    this.maxStock = props.maxStock;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  get status(): ProductStatus {
    return this.calculateStatus();
  }

  private calculateStatus(): ProductStatus {
    if (this.quantity <= 0) return 'OUT_OF_STOCK';
    if (this.quantity < this.minStock) return 'LOW_STOCK';
    return 'IN_STOCK';
  }

  isLowStock(): boolean {
    return this.quantity < this.minStock && this.quantity > 0;
  }

  isOutOfStock(): boolean {
    return this.quantity <= 0;
  }
}