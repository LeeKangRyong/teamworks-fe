import { useState, useCallback } from 'react';
import { authApi } from '@/entities/auth';
import { tokenStorage } from '@/shared/lib/tokenStorage';
import type { User, LoginCredentials } from './types'

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(() => {
        if (typeof window !== 'undefined') {
            const storedUser = tokenStorage.getUser();
            return storedUser;
        }
        return null;
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const clearError = useCallback(() => setError(null), []);

    const login = useCallback(async (credentials: LoginCredentials) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await authApi.login(credentials);
            const { user, accessToken, refreshToken } = data;

            tokenStorage.setTokens(accessToken, refreshToken, user);
            setUser(user);

            return data;
        } catch (e: unknown) {
            const err = e as { message?: string };
            const message = err.message || 'Login failed.';
            setError(message);
            throw e;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        console.log('Starting logout...');
        setIsLoading(true);

        try {
            try {
                await authApi.logout();
            } catch (error) {
                console.warn('API failed (continuing):', error);
            }

            setUser(null);
            setError(null);

            tokenStorage.clearTokens();

            await new Promise(resolve => setTimeout(resolve, 200));

        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoading(false);
            window.location.href = '/';
        }
    }, []);

    const checkAuth = useCallback(() => {
        const hasToken = tokenStorage.hasValidToken();
        const hasUser = !!user;
        return hasToken && hasUser;
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
