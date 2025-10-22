import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    const { pathname } = request.nextUrl;

    console.log('[Middleware] pathname:', pathname, 'token:', !!token);

    // 정적 파일들은 무조건 통과 (폰트 포함!)
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/assets') ||
        pathname.startsWith('/fonts') ||        // 이 줄 추가!
        pathname.includes('.') ||                // 확장자 있는 파일 (woff2, png, jpg 등)
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
            console.log('[Middleware] Redirecting to /projects');
            return NextResponse.redirect(new URL('/projects', request.url));
        }
        return NextResponse.next();
    }

    // 보호된 페이지들 (토큰 필요)
    if (!token) {
        console.log('[Middleware] No token, redirecting to /login');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * 다음을 제외한 모든 경로에 적용:
         * - api routes
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - fonts (font files)
         * - assets (public assets)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|fonts|assets).*)',
    ],
};