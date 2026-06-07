import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from './presentation/middlewares/authMiddleware';
import { roleMiddleware } from './presentation/middlewares/roleMiddleware';

export function middleware(request: NextRequest) {
  // 1. Executa validação básica de sessão
  const authResponse = authMiddleware(request);
  if (authResponse) return authResponse;

  // 2. Executa validação de papéis (roles) para rotas específicas
  const roleResponse = roleMiddleware(request);
  if (roleResponse) return roleResponse;

  // 3. Se nenhuma regra bloqueou, permite a requisição seguir o fluxo normal
  return NextResponse.next();
}

// Configuração padrão do Next.js para ignorar arquivos estáticos e de API
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};