import Link from 'next/link';

interface PaginationProps {
  page: number;
  totalPages: number;
  search?: string;
  basePath?: string;
}

export function Pagination({ page, totalPages, search, basePath = '/dashboard/inventory' }: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildHref = (targetPage: number) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    params.set('page', String(targetPage));
    return `${basePath}?${params.toString()}`;
  };

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex items-center justify-between border rounded-md p-4 text-sm">
      <span className="text-muted-foreground">
        Página {page} de {totalPages}
      </span>
      <div className="flex items-center gap-2">
        {canPrev ? (
          <Link
            href={buildHref(page - 1)}
            className="rounded-md border px-3 py-1.5 hover:bg-muted transition-colors"
          >
            Anterior
          </Link>
        ) : (
          <span className="rounded-md border px-3 py-1.5 text-muted-foreground opacity-50 cursor-not-allowed">
            Anterior
          </span>
        )}
        {canNext ? (
          <Link
            href={buildHref(page + 1)}
            className="rounded-md border px-3 py-1.5 hover:bg-muted transition-colors"
          >
            Próxima
          </Link>
        ) : (
          <span className="rounded-md border px-3 py-1.5 text-muted-foreground opacity-50 cursor-not-allowed">
            Próxima
          </span>
        )}
      </div>
    </div>
  );
}