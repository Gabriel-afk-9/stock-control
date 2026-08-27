import { Badge } from '@/shared/ui/badge';
import { ProductStatus } from '../../domain/entities/Product';

interface ProductStatusBadgeProps {
  status: ProductStatus;
}

export function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
  const statusMap = {
    IN_STOCK: { label: 'Em Estoque', variant: 'default' as const },
    LOW_STOCK: { label: 'Estoque Baixo', variant: 'secondary' as const },
    OUT_OF_STOCK: { label: 'Esgotado', variant: 'destructive' as const },
  };

  const config = statusMap[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}