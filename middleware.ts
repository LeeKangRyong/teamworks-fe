// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    const { pathname } = request.nextUrl;

    if (pathname === '/') {
        return NextResponse.next(); // 그냥 통과 (Main.jsx 보여줌)
    }

    if (pathname === '/login') {
        if (token) {
            return NextResponse.redirect(new URL('/projects', request.url));
        }
        return NextResponse.next();
    }

    // 토큰 없으면 -> /login으로 이동 
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
};