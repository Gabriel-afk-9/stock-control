import { PrismaClient } from "@prisma/client";
import { Plus, Search } from "lucide-react";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

function getStockStatus(qty: number, min: number) {
  if (qty === 0) return { label: "Fora de estoque", color: "bg-red-100 text-red-700" };
  if (qty <= min) return { label: "Estoque Baixo", color: "bg-yellow-100 text-yellow-700" };
  return { label: "Em estoque", color: "bg-green-100 text-green-700" };
}

export default async function InventoryPage() {
  const products = await prisma.product.findMany({
    orderBy: { itemCode: 'asc' }
  });

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Lista do inventário</h1>
        <div className="flex gap-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                    type="text" 
                    placeholder="Procurar..." 
                    className="pl-10 pr-4 py-2 border rounded-lg text-sm w-64 focus:outline-blue-500"
                />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition">
                <Plus size={16} /> Adicionar item
            </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 font-medium">
            <tr>
              <th className="px-6 py-4">Item</th>
              <th className="px-6 py-4">Descrição</th>
              <th className="px-6 py-4">Unidade</th>
              <th className="px-6 py-4">Estoque</th>
              <th className="px-6 py-4">Mínimo</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.length === 0 ? (
                <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        Nenhum produto cadastrado ainda.
                    </td>
                </tr>
            ) : (
                products.map((product) => {
                const status = getStockStatus(product.quantity, product.minStock);
                
                return (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">{product.itemCode}</td>
                    <td className="px-6 py-4 text-gray-600">{product.description || product.name}</td>
                    <td className="px-6 py-4">
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">
                        {product.unit}
                        </span>
                    </td>
                    <td className="px-6 py-4 font-medium">{product.quantity}</td>
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