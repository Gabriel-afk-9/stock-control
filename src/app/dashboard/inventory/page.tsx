import { makeListProductsUseCase } from "@/features/inventory/main/factories/makeListProductsUseCase";
import { InventoryTable } from "@/features/inventory/presentation/components/InventoryTable";
import { Pagination } from "@/shared/ui/Pagination";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

interface InventoryPageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function InventoryPage({ searchParams }: InventoryPageProps) {
  const sp = await searchParams;
  const page = Number(sp.page ?? '1') || 1;
  const search = sp.search ?? '';

  const listProductsUseCase = makeListProductsUseCase();
  const result = await listProductsUseCase.execute({ page, pageSize: 10, search });

  const searchParamsForForm = new URLSearchParams();
  if (search) searchParamsForForm.set('search', search);

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Estoque</h2>
      </div>

      <form method="get" className="flex items-end gap-2">
        <div className="flex-1 max-w-sm">
          <label htmlFor="search" className="text-sm text-muted-foreground">
            Buscar por nome ou SKU
          </label>
          <Input
            id="search"
            name="search"
            defaultValue={search}
            placeholder="Ex.: Parafuso"
          />
        </div>
        <Button type="submit">Buscar</Button>
      </form>

      <p className="text-sm text-muted-foreground">
        {result.total} produto(s) encontrado(s)
      </p>

      <InventoryTable products={result.products} />

      <Pagination page={result.page} totalPages={result.totalPages} search={search} />
    </main>
  );
}