import { NextRequest, NextResponse } from 'next/server';

export function authMiddleware(request: NextRequest): NextResponse | null {
  const session = request.cookies.get('session_user');
  const pathname = request.nextUrl.pathname;

  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isLoginRoute = pathname.startsWith('/login') || pathname === '/';

  // Visitante tentando acessar área restrita
  if (isDashboardRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Usuário logado tentando acessar tela de login ou raiz
  if (isLoginRoute && session) {
    return NextResponse.redirect(new URL('/dashboard/inventory', request.url));
  }

  // Se passou pelas regras, retorna nulo para prosseguir na cadeia
  return null;
}