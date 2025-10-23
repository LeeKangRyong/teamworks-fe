// src/shared/lib/tokenStorage.js
import { cookies } from './cookies';

export const tokenStorage = {
    setTokens: (accessToken, refreshToken, user = null) => {
        if (typeof window === 'undefined') return;
        
        try {
            console.log('[TokenStorage] Saving tokens and user:', { user });
            
            // Cookie에 저장 -> 60분
            cookies.set('accessToken', accessToken, 60 / (24 * 60));
            if (refreshToken) {
                cookies.set('refreshToken', refreshToken, 7);
            }
            
            // user 정보도 Cookie에 저장 (7일)
            if (user) {
                const userStr = JSON.stringify(user);
                console.log('[TokenStorage] User string to save:', userStr);
                cookies.set('user', userStr, 7);
                
                // 저장 확인
                setTimeout(() => {
                    const saved = cookies.get('user');
                    console.log('[TokenStorage] Verification - user saved:', saved);
                }, 100);
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
            console.log('[TokenStorage] Getting user, raw cookie value:', userStr);
            
            if (!userStr) {
                console.log('[TokenStorage] No user cookie found');
                return null;
            }
            
            const user = JSON.parse(userStr);
            console.log('[TokenStorage] Parsed user:', user);
            return user;
        } catch (error) {
            console.error('[TokenStorage] Failed to parse user data:', error);
            cookies.remove('user');
            return null;
        }
    },

    clearTokens: () => {
        if (typeof window === 'undefined') return;
        
        try {
            console.log('[TokenStorage] Clearing all tokens');
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
        const hasToken = !!token;
        console.log('[TokenStorage] Has valid token:', hasToken);
        return hasToken;
    }
};