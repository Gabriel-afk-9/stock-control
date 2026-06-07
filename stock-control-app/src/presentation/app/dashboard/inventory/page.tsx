import { PrismaProductRepository } from "../../../../infrastructure/database/repositories/PrismaProductRepository";
import { ListProductsUseCase } from "../../../../application/usecases/inventory/ListProductsUseCase";
import { Plus, Search } from "lucide-react";

const repository = new PrismaProductRepository();
const listProductsUseCase = new ListProductsUseCase(repository);

export default async function InventoryPage() {
  const products = await listProductsUseCase.execute();

  return (
    <div className="space-y-6">
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <tbody className="divide-y divide-gray-100">
            {products.length === 0 ? (
                <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        Nenhum produto cadastrado.
                    </td>
                </tr>
            ) : (
                products.map((product) => {
                const status = product.getStockStatus();
                
                return (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium">{product.itemCode}</td>
                    <td className="px-6 py-4">{product.description || product.name}</td>
                    <td className="px-6 py-4">
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">
                        {product.unit}
                        </span>
                    </td>
                    <td className="px-6 py-4">{product.quantity}</td>
                    <td className="px-6 py-4 text-gray-400">{product.minStock}</td>
                    <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.label}
                        </span>
                    </td>
                    </tr>
                );
                })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}