'use client'

import { useTransition } from 'react';
import { Button } from '@/shared/ui/button';
import { deleteProductAction } from '../actions/inventory.actions';

interface DeleteProductButtonProps {
  productId: string;
}

export function DeleteProductButton({ productId }: DeleteProductButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      startTransition(async () => {
        const result = await deleteProductAction(productId);
        if (!result.success) {
          alert(result.message);
        }
      });
    }
  };

  return (
    <Button 
      variant="destructive" 
      onClick={handleDelete} 
      disabled={isPending}
    >
      {isPending ? 'Deletando...' : 'Excluir'}
    </Button>
  );
}