import type { User } from '@/shared/types'

type StoredUser = User

export const tokenStorage = {
    setTokens: (accessToken: string, refreshToken: string | null, user: StoredUser | null = null): void => {
        if (typeof window === 'undefined') return;

        try {
            // 1. sessionStorage에 저장
            sessionStorage.setItem('accessToken', accessToken);

            // 2. 쿠키에 저장 (배포 환경용 - HTTPS에서는 Secure 필요)
            const isProduction = window.location.protocol === 'https:';
            const cookieOptions = [
                `accessToken=${accessToken}`,
                'path=/',
                'SameSite=Lax',  // CSRF 보호
                isProduction ? 'Secure' : '',  // HTTPS에서만 Secure 추가
                'max-age=86400'  // 24시간 (초 단위)
            ].filter(Boolean).join('; ');

            document.cookie = cookieOptions;

            // 3. refreshToken은 localStorage에
            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken);
            }

            // 4. user 정보는 sessionStorage에
            if (user) {
                sessionStorage.setItem('user', JSON.stringify(user));
            }
        } catch (error) {
            console.error('Token save failed:', error);
        }
    },

    getAccessToken: (): string | null => {
        if (typeof window === 'undefined') return null;

        // sessionStorage 우선 확인
        let token = sessionStorage.getItem('accessToken');

        // sessionStorage에 없으면 쿠키에서 읽기
        if (!token) {
            const cookies = document.cookie.split(';');
            const tokenCookie = cookies.find(c => c.trim().startsWith('accessToken='));
            if (tokenCookie) {
                token = tokenCookie.split('=')[1];
                // sessionStorage에 복구
                sessionStorage.setItem('accessToken', token);
            }
        }

        return token;
    },

    getRefreshToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('refreshToken');
    },

    getUser: (): StoredUser | null => {
        if (typeof window === 'undefined') return null;
        try {
            const userStr = sessionStorage.getItem('user');
            if (!userStr) {
                console.warn('No user in sessionStorage');
                return null;
            }
            const user = JSON.parse(userStr);
            return user;
        } catch (error) {
            console.error('Parse user failed:', error);
            sessionStorage.removeItem('user');
            return null;
        }
    },

    clearTokens: (): void => {
        if (typeof window === 'undefined') return;

        try {
            // 1. sessionStorage 제거
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('user');

            // 2. localStorage 제거
            localStorage.removeItem('refreshToken');

            // 3. 쿠키 제거 (여러 방법으로 시도)
            const isProduction = window.location.protocol === 'https:';

            // 방법 1: 과거 날짜로 만료
            document.cookie = `accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax${isProduction ? '; Secure' : ''}`;

            // 방법 2: max-age=0
            document.cookie = `accessToken=; path=/; max-age=0; SameSite=Lax${isProduction ? '; Secure' : ''}`;

        } catch (error) {
            console.error('Token clear failed:', error);
        }
    },

    hasValidToken: (): boolean => {
        if (typeof window === 'undefined') return false;

        // sessionStorage 또는 쿠키에 토큰이 있는지 확인
        const sessionToken = sessionStorage.getItem('accessToken');
        const cookieHasToken = document.cookie.includes('accessToken=');

        const isValid = !!(sessionToken || cookieHasToken);

        return isValid;
    }
};
