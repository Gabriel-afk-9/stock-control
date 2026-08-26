export type ProductStatus = 'IN_STOCK' | 'OUT_OF_STOCK' | 'LOW_STOCK';

export interface ProductProps {
  id?: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  status?: ProductStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product {
  public readonly id?: string;
  public readonly name: string;
  public readonly sku: string;
  public readonly quantity: number;
  public readonly price: number;
  public readonly status: ProductStatus;

  constructor(props: ProductProps) {
    this.id = props.id;
    this.name = props.name;
    this.sku = props.sku;
    this.quantity = props.quantity;
    this.price = props.price;
    // O domínio protege a própria regra de negócio:
    this.status = this.calculateStatus(props.quantity);
  }

  private calculateStatus(quantity: number): ProductStatus {
    if (quantity <= 0) return 'OUT_OF_STOCK';
    if (quantity < 10) return 'LOW_STOCK';
    return 'IN_STOCK';
  }
}