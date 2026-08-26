'use client'

import { Button } from '@/shared/ui/button';
import { useEffect } from 'react';

export default function InventoryError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Erro na camada de UI de Inventário:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
      <h2 className="text-xl font-semibold text-red-600">Falha ao carregar o inventário</h2>
      <p className="text-muted-foreground">Não foi possível processar os dados do estoque no momento.</p>
      <Button variant="outline" onClick={() => reset()}>
        Tentar Novamente
      </Button>
    </div>
  )
}