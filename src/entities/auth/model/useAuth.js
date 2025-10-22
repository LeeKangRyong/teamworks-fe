import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/entities/auth';
import { tokenStorage } from '@/shared/lib/tokenStorage';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined' && tokenStorage.hasValidToken()) {
            const storedUser = tokenStorage.getUser();
            setUser(storedUser || { isLogin: true });
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    const login = useCallback(async (credentials) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await authApi.login(credentials);
            const { user, accessToken, refreshToken } = data;

            // user 정보를 함께 저장
            tokenStorage.setTokens(accessToken, refreshToken, user);            
            setUser(user);
            
            router.push('/projects');
            
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