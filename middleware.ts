// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    const { pathname } = request.nextUrl;

    console.log('[Middleware] 🔍', {
        pathname,
        hasToken: !!token,
        cookies: request.cookies.getAll().map(c => c.name)
    });

    // 정적 파일은 무조건 통과
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/assets') ||
        pathname.startsWith('/fonts') ||
        pathname.includes('.') ||
        pathname === '/favicon.ico' ||
        pathname === '/logo.png'
    ) {
        return NextResponse.next();
    }

    // 메인 페이지는 항상 통과
    if (pathname === '/') {
        return NextResponse.next();
    }

    // 로그인 페이지
    if (pathname === '/login') {
        if (token) {
            console.log('[Middleware] ✅ Has token, redirect to /projects');
            return NextResponse.redirect(new URL('/projects', request.url));
        }
        return NextResponse.next();
    }

    // 보호된 페이지들
    if (!token) {
        console.log('[Middleware] ❌ No token, redirect to /login');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    console.log('[Middleware] ✅ Token valid, proceed');
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|fonts|assets).*)',
    ],
};