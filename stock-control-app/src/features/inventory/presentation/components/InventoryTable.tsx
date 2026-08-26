import { ProductDTO } from '../../application/dtos/ProductDTO';
import { DeleteProductButton } from './DeleteProductButton';
import { ProductStatusBadge } from './ProductStatusBadge';

interface InventoryTableProps {
  products: ProductDTO[];
}

export function InventoryTable({ products }: InventoryTableProps) {
  if (products.length === 0) {
    return <p className="text-muted-foreground p-4">Nenhum produto cadastrado no estoque.</p>;
  }

  return (
    <div className="border rounded-md mt-4 overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr className="border-b text-left">
            <th className="p-4 font-medium">Nome</th>
            <th className="p-4 font-medium">SKU</th>
            <th className="p-4 font-medium">Preço</th>
            <th className="p-4 font-medium">Quantidade</th>
            <th className="p-4 font-medium">Status</th>
            <th className="p-4 font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-muted/50 transition-colors">
              <td className="p-4">{product.name}</td>
              <td className="p-4 text-muted-foreground">{product.sku}</td>
              <td className="p-4">{product.formattedPrice}</td>
              <td className="p-4">{product.quantity}</td>
              <td className="p-4">
                <ProductStatusBadge status={product.status} />
              </td>
              <td className="p-4">
                <DeleteProductButton productId={product.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}