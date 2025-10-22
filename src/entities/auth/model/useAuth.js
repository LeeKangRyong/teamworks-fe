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
            if (storedUser) {
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
            
            tokenStorage.setTokens(accessToken, refreshToken, user);            
            setUser(user);
                        
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