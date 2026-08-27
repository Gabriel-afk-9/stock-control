'use client';

import { AlertCircleIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// 1. Isolamos a lógica que depende da URL em um componente interno
function UnauthorizedAlertContent() {
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

// 2. O componente principal apenas provê a barreira de Suspense
export function UnauthorizedAlert() {
  return (
    // Usamos fallback={null} porque o alerta só deve aparecer se houver erro.
    // Enquanto o Next.js checa a URL, não mostramos nada na tela.
    <Suspense fallback={null}>
      <UnauthorizedAlertContent />
    </Suspense>
  );
}