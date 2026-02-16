import { NextRequest } from 'next/server';
import { handleProxy } from './lib/auth-middleware';

export function proxy(request: NextRequest) {
    return handleProxy(request)
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}