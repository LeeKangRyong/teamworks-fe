// src/entities/auth/model/useAuth.js
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/entities/auth';
import { tokenStorage } from '@/shared/lib/tokenStorage';

export const useAuth = () => {
    // 초기 상태를 쿠키에서 가져오기
    const [user, setUser] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedUser = tokenStorage.getUser();
            console.log('[useAuth] Initial user from cookie:', storedUser);
            return storedUser;
        }
        return null;
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    // 컴포넌트 마운트 시 user 정보 재확인
    useEffect(() => {
        if (typeof window !== 'undefined' && tokenStorage.hasValidToken()) {
            const storedUser = tokenStorage.getUser();
            console.log('[useAuth] Mount - user from cookie:', storedUser);
            console.log('[useAuth] Current user state:', user);
            
            // user가 없는데 쿠키에는 있으면 업데이트
            if (storedUser && !user) {
                console.log('[useAuth] Updating user from cookie');
                setUser(storedUser);
            }
        }
    }, []); 

    const clearError = useCallback(() => setError(null), []);

    const login = useCallback(async (credentials) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await authApi.login(credentials);
            const { user, accessToken, refreshToken } = data;
            
            console.log('[useAuth] Login success, saving user:', user);
            tokenStorage.setTokens(accessToken, refreshToken, user);            
            setUser(user);
            
            // 저장 확인
            setTimeout(() => {
                const savedUser = tokenStorage.getUser();
                console.log('[useAuth] Verification - saved user:', savedUser);
            }, 100);
                        
            return data;
        } catch (e) {
            const message = e.message || 'Login failed.';
            console.error('[useAuth] Login error:', message);
            setError(message);
            throw e;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        setIsLoading(true);
        
        try {
            await authApi.logout();
        } catch (error) {
            console.warn('Logout failed:', error);
        } finally {
            console.log('[useAuth] Clearing tokens and user');
            tokenStorage.clearTokens();
            setUser(null);
            setIsLoading(false);
            
            router.push('/');
        }
    }, [router]);

    const checkAuth = useCallback(() => {
        return tokenStorage.hasValidToken() && user;
    }, [user]);

    return {
        user,
        isLoading,
        error,
        login,
        logout,
        checkAuth,
        clearError,
        setUser
    };
};