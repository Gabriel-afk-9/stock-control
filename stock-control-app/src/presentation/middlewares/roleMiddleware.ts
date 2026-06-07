import { NextRequest, NextResponse } from 'next/server';

export function roleMiddleware(request: NextRequest): NextResponse | null {
  const session = request.cookies.get('session_user');
  const pathname = request.nextUrl.pathname;

  const isUsersPage = pathname.startsWith('/dashboard/users');

  if (isUsersPage && session) {
    try {
      // Nota: JSON.parse é seguro aqui no Edge Runtime
      const user = JSON.parse(session.value);

      if (user.role !== 'ALMOXARIFE') {
        const referer = request.headers.get('referer');

        // Se veio de outra página interna, redireciona de volta com erro
        if (referer && referer.includes(request.nextUrl.origin)) {
          const url = new URL(referer);
          url.searchParams.set('error', 'unauthorized');

          if (!url.pathname.startsWith('/dashboard/users')) {
            return NextResponse.redirect(url);
          }
        }

        // Fallback genérico se acesso direto via URL
        const fallback = request.nextUrl.clone();
        fallback.pathname = '/dashboard';
        fallback.searchParams.set('error', 'unauthorized');
        return NextResponse.redirect(fallback);
      }
    } catch (error) {
      // Se o JSON do cookie estiver corrompido, derruba a sessão
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('session_user');
      return response;
    }
  }

  // Se tem permissão ou não é uma rota restrita por role, prossegue
  return null;
}