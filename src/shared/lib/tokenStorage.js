import { cookies } from './cookies';

export const tokenStorage = {
    setTokens: (accessToken, refreshToken) => {
        if (typeof window === 'undefined') return;
        
        // Cookie에 저장 -> 15분
        cookies.set('accessToken', accessToken, 15 / (24 * 60));
        if (refreshToken) {
            cookies.set('refreshToken', refreshToken, 7);
        }
    },

    getAccessToken: () => {
        if (typeof window === 'undefined') return null;
        return cookies.get('accessToken');
    },

    getRefreshToken: () => {
        if (typeof window === 'undefined') return null;
        return cookies.get('refreshToken');
    },

    clearTokens: () => {
        if (typeof window === 'undefined') return;
        
        cookies.remove('accessToken');
        cookies.remove('refreshToken');
    },

    hasValidToken: () => {
        if (typeof window === 'undefined') return false;
        
        const token = cookies.get('accessToken');
        return !!token;
    }
};