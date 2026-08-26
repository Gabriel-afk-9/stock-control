import { makeListProductsUseCase } from "@/features/inventory/main/factories/makeListProductsUseCase";
import { InventoryTable } from "@/features/inventory/presentation/components/InventoryTable";

// Se precisar de searchParams (paginação), passaremos para o UseCase no futuro.
export default async function InventoryPage() {
  // 1. Instancia o caso de uso (A página não sabe o que é Prisma ou API)
  const listProductsUseCase = makeListProductsUseCase();

  // 2. Executa a query diretamente (Retorna o ProductDTO[])
  const productsDTO = await listProductsUseCase.execute();

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Estoque</h2>
      </div>

      {/* 3. Passa os dados limpos para a UI renderizar */}
      <InventoryTable products={productsDTO} />
    </main>
  );
}