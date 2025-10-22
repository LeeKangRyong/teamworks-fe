import { cookies } from './cookies';

export const tokenStorage = {
    setTokens: (accessToken, refreshToken, user = null) => {
        if (typeof window === 'undefined') return;
        
        // Cookie에 저장 -> 60분
        cookies.set('accessToken', accessToken, 60 / (24 * 60));
        if (refreshToken) {
            cookies.set('refreshToken', refreshToken, 7);
        }
        
        // user 정보도 Cookie에 저장 (7일)
        if (user) {
            cookies.set('user', JSON.stringify(user), 7);
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
    
    getUser: () => {
        if (typeof window === 'undefined') return null;
        const userStr = cookies.get('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    clearTokens: () => {
        if (typeof window === 'undefined') return;
        
        cookies.remove('accessToken');
        cookies.remove('refreshToken');
        cookies.remove('user');
    },

    hasValidToken: () => {
        if (typeof window === 'undefined') return false;
        
        const token = cookies.get('accessToken');
        return !!token;
    }
};