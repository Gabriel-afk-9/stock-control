import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const session = request.cookies.get('session_user');

    const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');
    const isLoginRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname === '/';

    if (isDashboardRoute && !session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (isLoginRoute && session) {
        return NextResponse.redirect(new URL('/dashboard/inventory', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/login', '/dashboard/:path*'],
}