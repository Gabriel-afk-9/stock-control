'use client';

import { useSearchParams } from 'next/navigation';
import { AlertCircleIcon } from 'lucide-react';

export function UnauthorizedAlert() {
  const searchParams = useSearchParams();
  const hasError = searchParams.get('error') === 'unauthorized';

  if (!hasError) return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm animate-pulse">
      <div className="flex items-center">
        <AlertCircleIcon className="h-5 w-5 text-red-500" />
        <div className="ml-3">
          <p className="text-sm text-red-700 font-bold">
            Acesso Negado
          </p>
          <p className="text-sm text-red-600">
            Você não tem permissão de Almoxarife para acessar a área de usuários.
          </p>
        </div>
      </div>
    </div>
  );
}