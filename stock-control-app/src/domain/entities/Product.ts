export type UnitType = 'CX' | 'UN' | string;

export interface ProductProps {
  id?: string;
  itemCode: string;
  description: string | null;
  name: string;
  unit: UnitType;
  quantity: number;
  minStock: number;
  maxStock: number;
  category: string;
}

export class Product {
  constructor(private props: ProductProps) {}

  get id() { return this.props.id; }
  get itemCode() { return this.props.itemCode; }
  get quantity() { return this.props.quantity; }
  get minStock() { return this.props.minStock; }
  get name() { return this.props.name; }
  get unit() { return this.props.unit; }
  get description() { return this.props.description; }
  get category() { return this.props.category; }
  get maxStock() { return this.props.maxStock; }

  public getStockStatus(): { label: string; color: string } {
    if (this.props.quantity === 0) return { label: "Fora de estoque", color: "bg-red-100 text-red-700" };
    if (this.props.quantity <= this.props.minStock) return { label: "Estoque Baixo", color: "bg-yellow-100 text-yellow-700" };
    return { label: "Em estoque", color: "bg-green-100 text-green-700" };
  }
}