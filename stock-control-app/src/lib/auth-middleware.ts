import { NextResponse, NextRequest } from 'next/server';

export function handleProxy(request: NextRequest) {
    const session = request.cookies.get('session_user');

    const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');
    const isLoginRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname === '/';
    const isUsersPage = request.nextUrl.pathname.startsWith('/dashboard/users');

    if (isDashboardRoute && !session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (isLoginRoute && session) {
        return NextResponse.redirect(new URL('/dashboard/inventory', request.url))
    }

    if (isUsersPage && session) {
        try {
            const user = JSON.parse(session.value);

            if (user.role !== 'ALMOXARIFE') {
                return NextResponse.redirect(new URL('/dashboard/inventory?error=unauthorized', request.url));
            }
        } catch (error){
            const response = NextResponse. redirect(new URL('/login', request.url));
            response.cookies.delete('session_user');
            return response;
        }
    }

    return NextResponse.next()
}