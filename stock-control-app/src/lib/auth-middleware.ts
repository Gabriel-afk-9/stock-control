import { NextResponse, NextRequest } from 'next/server';

export function handleProxy(request: NextRequest) {
  const session = request.cookies.get('session_user');

  const pathname = request.nextUrl.pathname;
  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isLoginRoute = pathname.startsWith('/login') || pathname === '/';
  const isUsersPage = pathname.startsWith('/dashboard/users');

  if (isDashboardRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isLoginRoute && session) {
    return NextResponse.redirect(new URL('/dashboard/inventory', request.url));
  }

  if (isUsersPage && session) {
    try {
      const user = JSON.parse(session.value);

      if (user.role !== 'ALMOXARIFE') {
        const referer = request.headers.get('referer');

        if (referer && referer.includes(request.nextUrl.origin)) {
          const url = new URL(referer);
          url.searchParams.set('error', 'unauthorized');

          if (!url.pathname.startsWith('/dashboard/users')) {
            return NextResponse.redirect(url);
          }
        }

        const fallback = request.nextUrl.clone();
        fallback.pathname = '/dashboard';
        fallback.searchParams.set('error', 'unauthorized');
        return NextResponse.redirect(fallback);
      }
    } catch (error) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('session_user');
      return response;
    }
  }

  return NextResponse.next();
}