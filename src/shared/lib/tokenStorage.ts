import type { User } from '@/shared/types'

type StoredUser = User

export const tokenStorage = {
    setTokens: (accessToken: string, refreshToken: string | null, user: StoredUser | null = null): void => {
        if (typeof window === 'undefined') return;

        try {
            // 1. localStorage에 저장
            localStorage.setItem('accessToken', accessToken);

            // 2. 쿠키에 저장 (미들웨어 인증 게이트 - 30분)
            const isProduction = window.location.protocol === 'https:';
            const cookieOptions = [
                `accessToken=${accessToken}`,
                'path=/',
                'SameSite=Lax',
                isProduction ? 'Secure' : '',
                'max-age=1800'  // 30분
            ].filter(Boolean).join('; ');

            document.cookie = cookieOptions;

            // 3. refreshToken은 localStorage에
            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken);
            }

            // 4. user 정보는 localStorage에 (브라우저 재시작 후 30분 내 복구용)
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            }
        } catch (error) {
            console.error('Token save failed:', error);
        }
    },

    getAccessToken: (): string | null => {
        if (typeof window === 'undefined') return null;

        // localStorage 우선 확인
        let token = localStorage.getItem('accessToken');

        // localStorage에 없으면 쿠키에서 읽기
        if (!token) {
            const cookies = document.cookie.split(';');
            const tokenCookie = cookies.find(c => c.trim().startsWith('accessToken='));
            if (tokenCookie) {
                token = tokenCookie.split('=')[1];
                // localStorage에 복구
                localStorage.setItem('accessToken', token);
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
            const userStr = localStorage.getItem('user');
            if (!userStr) {
                return null;
            }
            const user = JSON.parse(userStr);
            return user;
        } catch (error) {
            console.error('Parse user failed:', error);
            localStorage.removeItem('user');
            return null;
        }
    },

    clearTokens: (): void => {
        if (typeof window === 'undefined') return;

        try {
            // 1. localStorage 제거
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            localStorage.removeItem('refreshToken');

            // 2. 쿠키 제거
            const isProduction = window.location.protocol === 'https:';

            document.cookie = `accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax${isProduction ? '; Secure' : ''}`;
            document.cookie = `accessToken=; path=/; max-age=0; SameSite=Lax${isProduction ? '; Secure' : ''}`;

        } catch (error) {
            console.error('Token clear failed:', error);
        }
    },

    hasValidToken: (): boolean => {
        if (typeof window === 'undefined') return false;

        const localToken = localStorage.getItem('accessToken');
        const cookieHasToken = document.cookie.includes('accessToken=');

        return !!(localToken || cookieHasToken);
    }
};
