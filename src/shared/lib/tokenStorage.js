import { cookies } from './cookies';

export const tokenStorage = {
    setTokens: (accessToken, refreshToken, user = null) => {
        if (typeof window === 'undefined') return;
        
        try {
            // Cookie에 저장 -> 60분
            cookies.set('accessToken', accessToken, 60 / (24 * 60));
            if (refreshToken) {
                cookies.set('refreshToken', refreshToken, 7);
            }
            
            // user 정보도 Cookie에 저장 (7일)
            if (user) {
                cookies.set('user', JSON.stringify(user), 7);
            }
        } catch (error) {
            console.error('[TokenStorage] Failed to save tokens:', error);
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
        try {
            const userStr = cookies.get('user');
            if (!userStr) return null;
            return JSON.parse(userStr);
        } catch (error) {
            console.error('[TokenStorage] Failed to parse user data:', error);
            cookies.remove('user');
            return null;
        }
    },

    clearTokens: () => {
        if (typeof window === 'undefined') return;
        
        try {
            cookies.remove('accessToken');
            cookies.remove('refreshToken');
            cookies.remove('user');
            console.log('[TokenStorage] Tokens cleared');
        } catch (error) {
            console.error('[TokenStorage] Failed to clear tokens:', error);
        }
    },

    hasValidToken: () => {
        if (typeof window === 'undefined') return false;
        
        const token = cookies.get('accessToken');
        return !!token;
    }
};