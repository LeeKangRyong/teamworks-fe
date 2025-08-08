import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../api/authApi';
import { tokenStorage } from '@/shared/lib/tokenStorage';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    // 새로고침 시 토큰 검증
    useEffect(() => {
        if (typeof window !== 'undefined' && tokenStorage.hasValidToken()) {
            setUser({ isLogin: true });
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    const login = useCallback(async (credentials) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await authApi.login(credentials);
            const { user, accessToken, refreshToken } = data;

            tokenStorage.setTokens(accessToken, refreshToken);            
            setUser(user);
            
            if (user.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/');
            }
            
            return data;
        } catch (e) {
            const message = e.message || 'Login failed.';
            setError(message);
            throw e;
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    const logout = useCallback(async () => {
        setIsLoading(true);
        
        try {
            await authApi.logout();
        } catch (error) {
            console.warn('Logout failed:', error);
        } finally {
            tokenStorage.clearTokens();
            setUser(null);
            setIsLoading(false);
            
            router.push('/auth/login');
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